<template>
  <div class="map_wrapper" style="--info-width: 300px; ">
    <div class="map_infos">
      <!-- <ElementAdInformation :info="info" /> -->
      <!-- <ListMapAddresses :data="addresses" @focusMap="focusMap" /> -->
    </div>
    <div v-show="isMapLoading" :style="{ ...mapStyles, background: '#9ca3af' }"></div>
    <ElementGmap
      v-show="!isMapLoading"
      class="map"
      ref="Gmap"
      :map-styles="mapStyles"
      :markers="addresses"
      @open-detail="showAdDetail"
    />
  </div>
</template>

<script setup>
import useMapStore from '~/stores/map.store'
import { onFocusMap } from '~/utils/map'

const mapStore = useMapStore()

await mapStore.getAddressesList()
const Gmap = ref(null)
const isMapLoading = computed(() => Gmap.value?.isLoading)

const addresses = computed(() => mapStore.gMapAddress)

const ads = mapStore.adLocations
const info = ref(null)
const showDetail = ref(true)
const focusMap = ({ value }) => {
  onFocusMap({ lat: value.lat, lng: value.lng }, Gmap.value)
}
const showAdDetail = (data) => {
  showDetail.value = true
}

const mapStyles = computed(() => {
  return {
    height: '100vh',
    // width: `calc(100vw - ${showDetail.value ? '300px' : '0'})`,
    width: `calc(100vw - 80px)`,
    'margin-left': 'auto'
  }
})

onMounted(() => {
  console.log('Gmap', Gmap.value)
})
</script>

<style>
.map_wrapper {
  --right-section-width: 300px;
  --left-section-width: 0;

  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
}
/* .vue-map-container {
  max-width: cal;
} */
.map_infos {
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: width 1s ease-in-out;
  /* position: absolute; */
  max-width: var(--right-section-width);
  right: 0;
  top: 0;
  background-color: #fff;
}
</style>