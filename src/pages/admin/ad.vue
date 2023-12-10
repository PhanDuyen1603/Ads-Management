<template>
  <div class="row">
    <div>
      <button @click="addAdsModal()">
        add Ads
      </button>
    </div>
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item" @click="isShowAdsList = !isShowAdsList">
        <div :class="`nav-link ${ !isShowAdsList ? 'active' : ''}`" aria-current="page" >Điểm đặt quảng cáo</div>
      </li>
      <li class="nav-item" @click="isShowAdsList = !isShowAdsList">
        <div :class="`nav-link ${ isShowAdsList ? 'active' : ''}`">Danh sách quảng cáo</div>
      </li>
    </ul>

    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <TableLocations :data="addresses" />
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
const { $modal } = useNuxtApp()
definePageMeta({
  layout: 'admin'
})
const mapStore = useMapStore()

await mapStore.getAddressesList()
const addresses = mapStore.addresses

const isShowAdsList = ref(false)

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