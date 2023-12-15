<template>
  <div class="admin_map_wrap">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"><span class="lstick"></span>DS địa điểm đặt quảng cáo</h4>
            <!-- <h4 class="card-title"><span class="lstick"></span>DS quảng cáo</h4> -->
            <div class="table-responsive admin_table">
              <table class="table table-hover" style="width: max-content;">
                <thead>
                  <tr>
                    <th>#</th>
                    <th v-for="(item, index) in Object.values(tableField)" :key="index" style="width: fit-content;">
                      {{ item }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in addresses" @click="focusMap(item)">
                    <td>{{ index + 1 }}</td>
                    <td v-for="(field, i) in Object.keys(tableField)" :key="i">
                      {{ item[field] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-12">
        <ElementGmap
          class="map"
          ref="map"
          :markers="addresses"
          :map-styles="{
            width: '100%',
            height: '45rem'
          }"
        />
    </div>

    </div>
  </div>
</template>

<script setup>
import useMapStore from '~/stores/map.store'
definePageMeta({
  layout: 'admin'
})
const { $gMap } = useNuxtApp()
const mapStore = useMapStore()

const map = ref(null)

await mapStore.getAddressesList()
const addresses = computed(() => mapStore.gMapAddress)

const tableField = {
  streetLine1: 'địa chỉ',
  city: 'thành phố',
  ward: 'quận',
  district: 'huyện'
}

// map interaction
const focusMap = (item) => {
  $gMap.changeMapCenter({ lat: item.lat, lng: item.lng })
}
</script>

<style>
.admin_table {
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
}
</style>