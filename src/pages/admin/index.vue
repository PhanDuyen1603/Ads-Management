<template>
  <div class="admin_map_wrap">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title"><span class="lstick"></span>Danh sách quảng cáo</h4>
            <div class="table-responsive">
              <table class="table vm font-14">
                <tr>
                  <th v-for="(item, index) in tableHeads" :key="index" style="width: fit-content;">
                    {{ mapKey[item] ? mapKey[item] : item }}
                  </th>
                </tr>
                <tr v-for="(item, index) in ads">
                  <td class="b-0"></td>
                  <td class="text-end font-medium b-0">{{ index }}</td>
                  <td class="text-end font-medium b-0">{{ item.address }}</td>
                  <td class="text-end font-medium b-0">{{ item.areaType }}</td>
                  <td class="text-end font-medium b-0">{{ item.positionType }}</td>
                  <td class="text-end font-medium b-0">{{ item.advertisingType }}</td>
                </tr>
                <!-- <tr>
                  <td>Tablet</td>
                  <td class="text-end font-medium">30.8%</td>
                </tr> -->
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-12">
        <ElementGmap
          class="map"
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
const mapStore = useMapStore()
const ads = mapStore.adLocations
const tableHeads = computed(() => ads.length && Object.keys(ads[0]))
</script>