<template>
  <div>
    <div v-for="item in modelValue" class="item_horizonal mb-3">
      <div class="item_resolve_btn">
        <div class="icon" @click="openDetailModal(item)">
          <IconsPencil />
        </div>
      </div>
      <div class="item_image">
        <img v-if="!item.report?.images || item.report.length === 0" src="" alt="">
        <img v-else :src="getFileUrl(item.report.images[0]?.path) || ''" alt="">
      </div>
      <div class="item_content">
        <div class="item_title">{{ item.report.fullName }}</div>
        <div class="item_text"><strong>BC địa điểm: </strong>{{ getFullAddressByAdsLocation(item) }}</div>
        <div class="item_extra">
          <p><strong>Loại báo cáo: </strong>{{ getName(item, 'report_reportType') }}</p>
          <p><strong>Ngày gửi: </strong>{{ item.report.createdAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
import { getFullAddressByAdsLocation } from '~/utils/location/address'
const props = defineProps({
  modelValue: {
    type: Array,
    default:() => []
  }
})
const { getFileUrl } = useMedia()
const { $modal } = useNuxtApp()

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminReportDetail',
    props: {
      modelValue: item,
      type: 'location'
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}
</script>

<style lang="scss">
.item_horizonal {
  display: flex;
  gap: 12px;
  position: relative;
  padding-right: 3rem;
}
.item_image img {
  width: 85px;
  height: 85px;
  background-color: lightgray;
  border-radius: 12px;
}
.item_title {
  font-size: 1rem;
  font-weight: 700;
}
.item_text {
  font-size: .85rem;
}
.item_extra p {
  margin: 0;
  font-size: .85rem;
}
.item_resolve_btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  .icon {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>