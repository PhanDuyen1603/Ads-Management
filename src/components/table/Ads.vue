<template>
  <div class="table-responsive">
    <table class="table table-full">
      <thead>
        <tr>
          <th>#</th>
          <th>
             Báo cáo
          </th>
          <th v-for="(item, index) in Object.keys(tableAd)" :key="`head_${index}`" style="width: fit-content;">
            {{ tableAd[item].label }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in initialData" :key="`ad_${index}`">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="count badge rounded-pill bg-danger" @click="openListReportModal(item.adReports)">
              {{ item.adReports?.length || '' }}
            </div>
          </td>
          <td v-for="(field, i) in Object.keys(tableAd)" :key="i">
            <div v-if="field !== 'images' && field !== 'address'" class="line-clamp-5">{{ getName(item, tableAd[field].key) }}</div>
            <div v-else-if="field === 'address'" class="line-clamp-5">{{ getFullAddressByAdsLocation(item) }}</div>
            <div class="table_images" v-else>
              <img v-for="(img, img_i) in item[field]" :key="`img_${img_i}`" :src="getFileUrl(img.path)" >
            </div>
          </td>
          <td class="detail_icon" @click="openDetailModal(item)">
            <i class="mdi mdi-eye-outline"></i>
          </td>
          <td v-if="userPermission.advertise.update">
            <button class="btn btn-success" @click="openUpdateModal(item)">
              chỉnh sửa
            </button>
          </td>
          <td v-if="userPermission.advertise.request">
            <button class="btn btn-success" @click="openUpdateModal(item)">
              Yêu cầu chỉnh sửa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName'
import { tableAd } from '~/constant/ads'
import { getFullAddressByAdsLocation } from '~/utils/location/address'
const { userPermission } = useAuth()

const { $modal } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array,
    default:() => []
  },
})
const { getFileUrl } = useMedia()

const { getReports } = useAdReport()
const list = await getReports(false)

const initialData = computed(() => {
  return props.data?.length ? props.data.map(x => ({
    ...x,
    adReports: list.filter(i => i.ads?._id === x._id && (!i.report.status || i.report.status === 0)),
  })) : []
})

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminAdDetail',
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

const openUpdateModal = async (item) => {
  await $modal.show({
    component: userPermission.value.advertise.update ? 'FormAdCreate' : 'FormAdRequestEdit',
    props: {
      defaultFormData: item,
      submitType: userPermission.value.advertise.update ? 'update' : 'request',
    },
    wrapperProps: {
      styles: {
        width: '650px',
        'overflow-y': userPermission.value.advertise.update ? 'unset' : 'scroll'
      }
    }
  })
}

const openListReportModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminListAdReport',
    props: {
      modelValue: item,
    },
  })
}

</script>

<style lang="scss">
.table_images {
  display: flex;
  gap: 8px;
  img {
    width: 70px;
    height: 70px;
  }
}
</style>