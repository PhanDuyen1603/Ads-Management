<template>
  <div class="info_body">
    <div class="info dialog report_info">
      <div class="info_1_head">
        <strong>Thông tin báo cáo</strong>
      </div>
      <div class="info_1_body">
        <div class="card mb-2">
          <!-- TODO: seperate component -->
          <div v-if="modelValue.ads && modelValue.adLocation" class="card-body">
            <h5>{{ getName(modelValue, 'ads_title') }}</h5>
            <p>{{ getName(modelValue, 'ads_content') }}</p>
            <p>{{ getFullAddressByAdsLocation(modelValue) }}</p>
            <p>Kích thước: &nbsp{{ modelValue.ads.width }}m x {{ modelValue.ads.height }}m</p>
          </div>
          <!--  -->
          <div v-if="modelValue.adsLocation" class="card-body">
            <h5>Địa điểm đặt quảng cáo</h5>
            <p>{{ getFullAddressByAdsLocation(modelValue) }}</p>
            <p>Hình thức quảng cáo: &nbsp{{ getName(modelValue, 'adsLocation_adsCategory_name') }}</p>
          </div>
        </div>
        <div class="card mb-2">
          <div v-if="modelValue && modelValue.report" class="card-body">
            <h5><strong>Tên người báo cáo: </strong>{{ modelValue.report.fullName }}</h5>
            <p><strong>Email: </strong>{{ modelValue.report.email }}</p>
            <p><strong>Nội dung báo cáo: </strong> <span v-html="modelValue.report.content"></span></p>
            <p><strong>Hình ảnh minh hoạ: </strong></p>
            <div v-if="modelValue.report?.images?.length" class="group_images">
              <img v-for="(image, index) in modelValue.report.images" :key="index" :src="getFileUrl(image.path)" alt="">
            </div>
          </div>
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
    type: Object,
    default:() => {}
  }
})
const { getFileUrl } = useMedia()

</script>
<style lang="scss">
.group_images {
  display: flex;
  gap: 20px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
  }
}
</style>