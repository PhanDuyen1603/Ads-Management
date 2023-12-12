<template>
  <div class="table-responsive">
    <table class="table table-overflow">
      <thead>
        <tr>
          <th>#</th>
          <th v-if="$map">goto</th>
          <th v-for="(item, index) in Object.values(tableField)" :key="`head_${index}`" style="width: fit-content;">
            {{ item }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td v-if="$map" @click="focusMap(item)">
            <i class="bi bi-crosshair"></i>
          </td>
          <td v-for="(field, i) in Object.keys(tableField)" :key="i">
            <div class="tb-content">
              {{ item[field] }}
            </div>
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
</template>

<script setup>
import { onFocusMap } from '~/utils/map'

const { $modal } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array
  },
  $map: {
    type: Object,
    default:() => {}
  }
})

const tableField = {
  streetLine1: 'địa chỉ',
  city: 'thành phố',
  ward: 'Phường',
  district: 'quận'
}

const focusMap = () => {
  onFocusMap({ lat: item.lat, lng: item.lng }, $map)
}

const openReportModal = async (item) => {
  const result = await $modal.show({
    component: 'FormAddressRequestEdit',
    props: {
      defaultFormData: item,
      submitType: 'update'
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminAdDetail',
    props: {...item},
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}

</script>