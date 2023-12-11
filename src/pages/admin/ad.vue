<template>
  <div class="row">
    <div>
      <button @click="addAdsModal()">
        add Ads
      </button>
    </div>

    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <ul class="nav nav-pills nav-fill mb-2">
            <li class="nav-item" @click="showAddressList()">
              <div :class="`nav-link ${ !isShowAdsList ? 'active' : ''}`">
                Điểm đặt quảng cáo
              </div>
            </li>
            <li class="nav-item" @click="showAdsList()">
              <div :class="`nav-link ${ isShowAdsList ? 'active' : ''}`">
                Danh sách quảng cáo
              </div>
            </li>
          </ul>
          <TableLocations v-if="!isShowAdsList" :data="dataList" :key="`location_${new Date()}`" />
          <TableAds v-else :data="dataList" :key="`ad_${new Date()}`" />
        </div>
      </div>
    </div>
    <!-- <div class="col-lg-4">
      <ElementGmap class="map" :map-styles="{
        width: '100%',
        height: '30rem'
      }" />
    </div> -->
  </div>
</template>

<script setup>
import useMapStore from '~/stores/map.store'
import useAdsStore from '~/stores/ads.store'
const { $modal } = useNuxtApp()
definePageMeta({
  layout: 'admin'
})
const mapStore = useMapStore()
const adsStore = useAdsStore()

await mapStore.getAddressesList()
const dataList = computed(() => !isShowAdsList.value ? mapStore.addresses : adsStore.ads)

const isShowAdsList = ref(false)

const showAddressList = async () => {
  if(!isShowAdsList.value) return
  isShowAdsList.value = false
  await mapStore.getAddressesList()
}

const showAdsList = async () => {
  if(isShowAdsList.value) return
  isShowAdsList.value = true
  await adsStore.getAdsList()
}

const addAdsModal = async (item) => {
  const result = await $modal.show({
    component: 'FormAdCreate',
    props: {
      info: item
    }
  })
}
</script>
<style>
.detail_icon {
  cursor: pointer;
}
.nav-item {
  cursor: pointer;
}
</style>