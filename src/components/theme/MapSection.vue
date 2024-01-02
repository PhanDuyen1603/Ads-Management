<template>
  <div class="map_wrapper" style="--info-width: 300px; ">
    <div v-show="isMapLoading" :style="{ ...mapStyles, background: '#9ca3af' }"></div>
    <ElementGmap
      v-show="!isMapLoading"
      class="map"
      ref="Gmap"
      :map-styles="mapStyles"
      :markers="markers"
      @open-detail="showAdDetail"
    />
  </div>
</template>

<script setup>
import { changeToSlug } from '~/utils/string/slug'
import useLocationStore from '~/stores/locations.store'
import { mapAdsLocation } from '~/utils/mapData'

const { getLocations, markers } = useLocation()
await getLocations()

const mapStore = useLocationStore()
const $router = useRouter()

const Gmap = ref(null)
const isMapLoading = computed(() => Gmap.value?.isLoading)

const showAdDetail = ({value}) => {
  const ad = mapAdsLocation(value) || {}
  mapStore.setDetailTarget(ad)
  $router.push({
    path: '/',
    query: {
      detail: changeToSlug(ad?.streetLine1 || '')
    },
  });
}

const mapStyles = computed(() => {
  return {
    height: '100vh',
    width: `calc(100vw - 106px)`,
    'margin-left': 'auto'
  }
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

.map_infos {
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: width 1s ease-in-out;
  max-width: var(--right-section-width);
  right: 0;
  top: 0;
  background-color: #fff;
}
</style>