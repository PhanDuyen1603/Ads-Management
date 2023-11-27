<template>
  <div class="row">
    <!-- column -->
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                  <tr>
                    <th>#</th>
                    <th v-for="(item, index) in tableField" :key="`head_${index}`" style="width: fit-content;">
                      {{ mapKey[item] ? mapKey[item] : item }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in ads">
                    <td>{{ index + 1 }}</td>
                    <td v-for="(field, i) in tableField" :key="i">
                      {{ item[field] }}
                    </td>
                    <td class="detail_icon" @click="openDetailModal(item)">
                      <i class="mdi mdi-eye-outline"></i>
                    </td>
                    <td>
                      <button class="btn btn-success" @click="openReportModal(item)">
                        Yêu cầu chỉnh sửa
                      </button>
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>
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
const tableField = ['address', 'areaType', 'positionType', 'advertisingType']
const ads = mapStore.adLocations

const openReportModal = async (item) => {
  const result = await $modal.show({
    component: 'ModalAdminAdRequestEdit',
    props: {
      info: item
    }
  })
}

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminAdDetail',
    props: {...item}
  })
}
</script>
<style>
.detail_icon {
  cursor: pointer;
}
</style>