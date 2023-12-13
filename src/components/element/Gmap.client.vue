<template>
  <GMapMap
    :center="mapCenter"
    :zoom="18"
    map-type-id="terrain"
    ref="myMapRef"
    :style="mapStyles"
  >
    <GMapCluster v-if="markers.length" :zoomOnClick="true">
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :icon= '{
          url: getMarkerIcon(m),
          scaledSize: {width: 30, height: 30},
          labelOrigin: {x: 16, y: -10}
        }'
        @click="onFocusMarker(m)"
      >
        <GMapInfoWindow
          :closeclick="true"
          @closeclick="onOpenMarker(null)"
          :opened="openMarker === m.id"
        >
          <div v-if="!markers.ads" class="marker_info">
            <h3>{{ m.streetLine1 }}</h3>
            <p>{{ m.ward }}</p>
            <p>{{ m.district }}</p>
            <p>{{ m.city }}</p>
            <h4>{{ m.isPlanned ? 'Đã' : 'Chưa' }} quy hoạch</h4>
          </div>
        </GMapInfoWindow>

      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>

<script>
import { defaultLocation } from '~/constant/locations';
import { getMarkerIcon } from '~/utils/map'
export default {
  props: {
    mapStyles: {
      type: Object,
      default:() => ({
        width: '100vw',
        height: '40rem',
      })
    },
    markers: {
      type: Array,
      default: () => []
    },
    center: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      openMarker: null,
      customCenter: {},
    };
  },
  setup(props, { emit }) {
    const myMapRef = ref();
    const isLoading = ref(true)

    const getLocationFromClick = (map) => {
      window.google.maps.event.addListener(map, 'click', function( event ){
        console.log('event', event)
        // alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() );
        setTimeout(() => {
          const infoWindow = document.querySelector('.poi-info-window')
          const data = {
            position: {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            },
            title: infoWindow?.querySelector('.title')?.innerText,
            full_address: infoWindow?.querySelector('.address')?.innerText.replaceAll('\n', ', '),
            streetLine1: infoWindow?.querySelector('[jsinstance="0"]')?.innerText,
            ward: infoWindow?.querySelector('[jsinstance="1"]')?.innerText,
            district: infoWindow?.querySelector('[jsinstance="2"]')?.innerText,
            city: infoWindow?.querySelector('[jsinstance="*3"]')?.innerText,
          }
          emit('getPlace', { value: data })
          // console.log(infoWindow, data)
        }, 1000)
      });
    }

    watch(myMapRef, googleMap => {
      if (googleMap) {
        googleMap.$mapPromise.then(map=> {
          getLocationFromClick(map)
          isLoading.value = false
        })
      }
    });

    return {
      myMapRef,
      isLoading
    }
  },

  computed: {
    mapCenter() {
      if(this.customCenter && this.customCenter.lat && this.customCenter.lng) return this.customCenter
      if(this.center && this.center.lat && this.center.lng) return this.center
      return defaultLocation.position
    }
  },
  methods: {
    getMarkerIcon,
    onOpenMarker(id) {
      this.openMarker = id
    },
    onFocusMarker(location) {
      this.onOpenMarker(location.id)
      this.$emit('openDetail', { value: location })
    },
    onCenterMap(location = {}) {
      if (location && location.lat) this.customCenter.lat = location.lat;
      if (location && location.lng) this.customCenter.lng = location.lng;
    },
  }
};
</script>

<style lang="scss">
.cluster img {
  max-width: 100%;
  max-height: 100%;
}
.cluster span{
  color: #fff;
}
.marker_info {
  max-width: 300px;
  > * {
    font-size: .8rem;
    margin: .5rem;
  }
  h3 {
    font-size: .9rem;
  }
}
</style>