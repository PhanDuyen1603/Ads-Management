<template>
  <GMapMap
    :center="mapCenter"
    :zoom="16.5"
    map-type-id="terrain"
    ref="myMapRef"
    :style="mapStyles"
  >
    <GMapCluster v-if="markers.length && showMarkers" :zoomOnClick="true">
      <!-- :position="m.position" -->
      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="{ lat: +m.lat, lng: +m.lng|| +m.long }"
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
            <h3>{{ getName(m, 'locationType') }}</h3>
            <p>{{ getName(m, 'adsCategory') }}</p>
            <p>{{ `${m.streetLine1} ${m.streetLine2 || ''}` }}, Phường: {{ getName(m, 'ward') }}, Quận: {{ getName(m, 'district') }}, TP Hồ Chí Minh</p>
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
import getLocationFromClick from '~/utils/map/getLocationFromClick'
import generateButtons from '~/composables/map/generateButtons'
import getName from '~/utils/getter/getName'
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
    },
    showMarkers: {
      type: Boolean,
      default: true
    },
    markers: {
      type: Array,
      default:() => []
    }
  },
  setup(props, { emit }) {
    const gmapStore = useGmapStore()
    const myMapRef = ref();
    const isLoading = ref(true)
    const targetMarker = ref(null)

    const initCenter = computed(() => gmapStore.center)
    const mapCenter = computed(() => {
      if(props.center && props.center.lat && props.center.lng) return props.center
      return initCenter.value
    })

    const {
      stausControlButtons
    } = generateButtons()

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
          getLocationFromClick(map, emit)
          stausControlButtons(map)
          //
          //
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
      mapCenter,
      targetMarker,
      focusMarker,
      onFocusMarker,
      getMarkerIcon,
    }
  },
  methods: {
    getName
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