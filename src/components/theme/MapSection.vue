<template>
  <div class="map_wrapper" style="--info-width: 300px; ">
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
import { changeToSlug } from '~/utils/string/slug'
import useMapStore from '~/stores/map.store'

const mapStore = useMapStore()
const $router = useRouter()

await mapStore.getAddressesList()
const Gmap = ref(null)
const isMapLoading = computed(() => Gmap.value?.isLoading)

const addresses = computed(() => mapStore.gMapAddress)

const showAdDetail = ({value}) => {
  mapStore.target = value
  $router.push({
    path: '/',
    query: {
      detail: changeToSlug(value?.streetLine1 || '')
    },
  });
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