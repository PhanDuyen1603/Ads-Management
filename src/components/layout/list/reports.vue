<template>
  <div class="reports">
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <div :class="['nav-link', { active: !isShowAdReport }]" aria-current="page" href="#" @click="isShowAdReport = false">Điểm đặt quảng cáo</div>
        </li>
        <li class="nav-item">
          <div :class="['nav-link', { active: isShowAdReport }]" aria-current="page" href="#" @click="isShowAdReport= true">Quảng cáo</div>
        </li>
      </ul>
    </div>
    <div v-if="initData.length" v-for="(item, index) in initData" :key="index" class="card card-report">
      <div v-if="item.report?.fullName" class="card-body">
        <h5 v-if="item.ads" class="card-title">{{ item.ads.title }}</h5>
        <h5 v-if="item.adsLocation?.address" class="card-title">{{ getFullAddressByAdsLocation(item) }}</h5>
        <p class="card-date">Ngày gửi: {{ formatDate(item.report?.createdAt) }}</p>
        <p class="card-text"><span>Nội dung: </span><span v-html="item.report?.content || '<div></div>'" /></p>
        <button class="btn btn-outline-primary" @click="showReportDetail(item)">Xem chi tiết</button>
      </div>
    </div>
    <div v-else>
      <div class="card-body">
        <h5 class="card-title">Không có dữ liệu</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
import { getFullAddressByAdsLocation } from '~/utils/location/address'

const props = defineProps({
  dataList: {
    type: Array,
    defaultl:() => []
  }
})
const { $dayjs } = useNuxtApp()
const emits = defineEmits(['focus-item'])
const formatDate = (date) => $dayjs(date).format('DD-MM-YYYY')
const isShowAdReport = ref(false)

const initData = computed(() => {
  return props.dataList.filter(x => isShowAdReport.value ? x.ads?._id : x.adsLocation?._id)
})

const showReportDetail = (item) => {
  emits('focus-item', item)
}
</script>

<style lang="scss">
.nav-link {
  cursor: pointer;
}
</style>