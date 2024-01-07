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
            <div v-if="m.fullAddress && m.report?._id">
              <h3>{{ m.fullAddress }}</h3>
              <p><strong>Người báo cáo: </strong>{{ m.report.fullName }}</p>
              <p><strong>Email: </strong>{{ m.report.email }}</p>
              <p><strong>Nội dung: </strong><span class="line-clamp-1" v-html="m.report.content" /></p>
            </div>
            <div v-else>
              <h3>{{ getName(m, 'locationType') }}</h3>
              <p>{{ getName(m, 'adsCategory') }}</p>
              <p>{{ `${m.streetLine1} ${m.streetLine2 || ''}` }}, Phường: {{ getName(m, 'ward') }}, Quận: {{ getName(m, 'district') }}, TP Hồ Chí Minh</p>
              <p><strong>{{ m.isPlanned ? 'Đã' : 'Chưa' }} quy hoạch</strong></p>
            </div>
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
      stausControlButtons,
      generateListMarkers,
      generateFilterButton
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
          // stausControlButtons(map)
          generateListMarkers(map)
          generateFilterButton(map)
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
  h3 {
    font-size: .9rem;
  }
  p {
    font-size: .8rem;
    margin-bottom: .5rem;  
    display: inline-flex;
    gap: 5px;
  }
}
.card-filter {
  background-color: #fff;
  font-size: 1.5rem;
  padding: .5rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
}
</style>