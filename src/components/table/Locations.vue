<template>
  <div class="table-responsive">
    <table :class="['table', tableClass]">
      <thead>
        <tr>
          <th>#</th>
          <th>
             Báo cáo
          </th>
          <th>Địa chỉ</th>
          <th v-for="(item, index) in Object.values(tableField)" :key="`head_${index}`" style="width: fit-content;">
            {{ item }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in transformData">
          <td>{{ index + 1 }}</td>
          <td>
            <div @click="openModalListReport(item)" class="count badge rounded-pill bg-danger">
              {{ item.adLocationReport?.length || '' }}
            </div>
          </td>
          <td>
            {{ `${item.streetLine1}, ${item.streetLine2}` }}
          </td>
          <td v-for="(field, i) in Object.keys(tableField)" :key="i">
            <div class="tb-content">
              {{ getName(item, field) }}
            </div>
          </td>
          <td class="detail_icon" @click="openDetailModal(item)">
            <i class="mdi mdi-eye-outline"></i>
          </td>
          <td v-if="userPermission.address.request && showUpdateBtn">
            <button class="btn btn-success" @click="openReportModal(item)">
              Yêu cầu chỉnh sửa
            </button>
          </td>
          <td v-if="userPermission.address.update && showUpdateBtn">
            <button class="btn btn-success" @click="openReportModal(item)">
              Chỉnh sửa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { mapAdsLocation } from '~/utils/mapData'
import getName from '~/utils/getter/getName'
const { $modal } = useNuxtApp()
const { userPermission } = useAuth()
const emits = defineEmits(['refresh'])
const props = defineProps({
  data: {
    type: Array,
    default:() => []
  },
  tableClass: {
    type: String,
    default: ''
  },
  showUpdateBtn: {
    type: Boolean,
    default: true
  }
})

const { getReports: getAdLocationsReports } = useAdLocationReport()
const list = await getAdLocationsReports(false)

const transformData = computed(() => props.data && props.data.length && props.data.map(x => mapAdsLocation(x, list)) || [])

const tableField = {
  city: 'Thành phố',
  ward: 'Phường',
  district: 'Quận'
}
const openReportModal = async (item) => {
  const result = await $modal.show({
    component: userPermission.value.advertise.update ? 'FormAddressRequestEdit' : 'FormAddressRequestEdit',
    // component: 'FormAddressRequestEdit',
    props: {
      defaultFormData: item,
      submitType: userPermission.value.advertise.update ? 'update' : 'request',
      formType: 'location'
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
  emits('refresh')
}

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminAdLocationDetail',
    props: {
      modelValue: item
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}

const openModalListReport = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminListReport',
    props: {
      modelValue: item.adLocationReport || []
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}

</script>

<style>
.detail_icon, .count {
  cursor: pointer;
}
</style>