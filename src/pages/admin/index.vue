<template>
  <div class="admin_map_wrap">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"><span class="lstick"></span>Danh sách quảng cáo</h4>
            <div class="table-responsive admin_table">
              <table class="table table-hover" style="width: max-content;">
                <thead>
                  <tr>
                    <th>#</th>
                    <th v-for="(item, index) in tableField" :key="index" style="width: fit-content;">
                      {{ mapKey[item] ? mapKey[item] : item }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in ads" @click="onFocusMap(item)">
                    <td>{{ index + 1 }}</td>
                    <td v-for="(field, i) in tableField" :key="i">
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
          :markers="ads"
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
import { mapKey } from '~/utils/generateLocation'
definePageMeta({
  layout: 'admin'
})
const map = ref(null)
const tableField = ['address', 'areaType', 'positionType', 'advertisingType']
const mapStore = useMapStore()
const ads = mapStore.adLocations
const onFocusMap = (item) => {
  map.value.onCenterMap?.(item.position)
}
</script>

<style>
.admin_table {
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
}
</style>