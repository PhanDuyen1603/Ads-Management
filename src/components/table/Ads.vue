<template>
  <div class="table-responsive">
    <table class="table table-full">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="(item, index) in Object.keys(tableAd)" :key="`head_${index}`" style="width: fit-content;">
            {{ tableAd[item].label }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td v-for="(field, i) in Object.keys(tableAd)" :key="i">
            <div v-if="field !== 'images' && field !== 'address'" class="line-clamp-5">{{ getName(item, tableAd[field].key) }}</div>
            <div v-else-if="field === 'address'" class="line-clamp-5">{{ buildAddress(item) }}</div>
            <div class="table_images" v-else>
              <img v-for="(img, img_i) in item[field]" :key="`img_${img_i}`" :src="getFileUrl(img.path)" >
            </div>
          </td>
          <td v-if="userPermission.advertise.update">
            <button class="btn btn-success" @click="openDetailModal(item)">
              chỉnh sửa
            </button>
          </td>
          <td v-if="userPermission.advertise.request">
            <button class="btn btn-success" @click="openDetailModal(item)">
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
const { userPermission } = useAuth()

const { $modal } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array
  },
})
const { getFileUrl } = useMedia()

const openDetailModal = async (item) => {
  await $modal.show({
    component: userPermission.value.advertise.update ? 'LazyFormAdCreate' : 'LazyFormAdRequestEdit',
    props: {
      defaultFormData: item,
      submitType: userPermission.value.advertise.update ? 'update' : 'request',
    },
    wrapperProps: {
      styles: {
        width: '650px',
        'overflow-y': 'unset'
      }
    }
  })
}

const buildAddress = (item) => {
  return `${getName(item, 'adsLocation_address_streetLine1')}, ${getName(item, 'adsLocation_address_streetLine2')}, phường ${getName(item, 'adsLocation_address_ward')}, quận ${getName(item, 'adsLocation_address_district')}, TP HCM`
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