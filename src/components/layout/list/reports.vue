<template>
  <div class="reports">
    <div v-for="(item, index) in dataList" :key="index" class="card card-report">
      <div v-if="item.report?.fullName" class="card-body">
        <h5 v-if="item.ads" class="card-title">{{ item.ads.title }}</h5>
        <h5 v-if="item.adsLocation?.address" class="card-title">{{ item.adsLocation.address.streetLine1 }}, {{
          item.adsLocation.address.streetLine2 }}</h5>
        <p class="card-date">Ngày gửi: {{ formatDate(item.report?.createdAt) }}</p>
        <p class="card-text"><span>Nội dung: </span><span v-html="item.report?.content || '<div></div>'" /></p>
        <!-- <div v-if="item.report.images && item.report?.images.length" class="card-images"> -->
        <!-- TODO: get image -->
        <!-- <img v-for="(img, j) in item.report?.images" :key="j" :src="getFileUrl('./uploads/' + img)" alt=""> -->
        <!-- </div> -->
        <button class="btn btn-outline-primary" @click="showReportDetail(item)">Xem chi tiết</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { faker } from '@faker-js/faker';
import getName from '~/utils/getter/getName';

const props = defineProps({
  dataList: {
    type: Array,
    defaultl:() => []
  }
})
const { $dayjs } = useNuxtApp()
const emits = defineEmits(['focus-item'])
const formatDate = (date) => $dayjs(date).format('DD-MM-YYYY')

const showReportDetail = (item) => {
  emits('focus-item', item)
}
</script>