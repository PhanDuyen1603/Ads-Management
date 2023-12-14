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
          @closeclick="focusMarker(null)"
          :opened="targetMarker === m.id"
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
import { getMarkerIcon } from '~/utils/map'
import useGmapStore from '~/stores/gmap.store'
export default {
  props: {
    mapStyles: {
      type: Object,
      default:() => ({
        width: '100vw',
        height: '40rem',
      })
    },
    center: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit }) {
    const gmapStore = useGmapStore()
    const myMapRef = ref();
    const isLoading = ref(true)
    const targetMarker = ref(null)

    const markers = computed(() => gmapStore.markers)
    const initCenter = computed(() => gmapStore.center)
    const mapCenter = computed(() => {
      if(props.center && props.center.lat && props.center.lng) return props.center
      return initCenter.value
    })

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

    const focusMarker = (id) => {
      targetMarker.value = id
    }

    const onFocusMarker = (location) => {
      focusMarker(location.id)
      emit('openDetail', { value: location })
    }

    watch(myMapRef, googleMap => {
      if (googleMap) {
        googleMap.$mapPromise.then(map=> {
          getLocationFromClick(map)
          isLoading.value = false
        })
      }
    });

    onBeforeMount(() => {
      gmapStore.initCenter = null
    })

    return {
      myMapRef,
      isLoading,
      markers,
      mapCenter,
      targetMarker,
      focusMarker,
      onFocusMarker,
      getMarkerIcon,
    }
  },
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