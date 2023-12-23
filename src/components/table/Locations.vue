<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <!-- <th >goto</th> -->
          <th v-for="(item, index) in Object.values(tableField)" :key="`head_${index}`" style="width: fit-content;">
            {{ item }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in transformData">
          <td>{{ index + 1 }}</td>
          <!-- <td @click="focusMap(item)">
            <i class="bi bi-crosshair"></i>
          </td> -->
          <td v-for="(field, i) in Object.keys(tableField)" :key="i">
            <div class="tb-content">
              {{ item[field] }}
            </div>
          </td>
          <td class="detail_icon" @click="openDetailModal(item)">
            <i class="mdi mdi-eye-outline"></i>
          </td>
          <td v-if="userPermission.address.request">
            <button class="btn btn-success" @click="openReportModal(item)">
              Yêu cầu chỉnh sửa
            </button>
          </td>
          <td v-if="userPermission.address.update">
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
const { $modal, $gMap } = useNuxtApp()
const { userPermission } = useAuth()
const props = defineProps({
  data: {
    type: Array,
    default:() => []
  },
})

const transformData = computed(() => props.data && props.data.length && props.data.map(x => mapAdsLocation(x)) || [])

const tableField = {
  streetLine1: 'Địa chỉ',
  city: 'Thành phố',
  ward: 'Phường',
  district: 'Quận'
}
const openReportModal = async (item) => {
  const result = await $modal.show({
    component: 'FormAddressRequestEdit',
    props: {
      defaultFormData: item,
      submitType: userPermission.value.advertise.update ? 'update' : 'request',
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