<template>
  <div class="admin_map_wrap">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-body" style="max-height: calc(100vh - 100px); overflow: auto;">
            <h4 class="card-title"><span class="lstick"></span>Danh sách địa điểm đặt quảng cáo</h4>
            <TableLocations :data="addresses" :key="`location_${new Date()}`" table-class="table-overflow" :show-update-btn="false" />
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-12">
        <ElementGmap
          class="map"
          ref="map"
          :markers="adsLocations"
          :map-styles="{
            width: '100%',
            height: 'calc(100vh - 100px)'
          }"
          :center="adsLocations[0]?.position"
        />
    </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ["admin"],
})
const { $gMap } = useNuxtApp()
const { getAdsLocations, adsLocations } = useAdvertise()
const { getLocations, addresses } = useLocation()
await getAdsLocations()
await getLocations()
const map = ref(null)

// map interaction
const focusMap = (item) => {
  $gMap.changeMapCenter({ lat: item.lat, lng: item.lng })
}

// onMounted(async () => {

// })
</script>

<style>
.admin_table {
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
}
</style>