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
            <p>{{ getName(modelValue, 'adLocation_address_streetLine1') }},
              {{ getName(modelValue, 'adLocation_address_streetLine2') }},
              {{ getName(modelValue, 'adLocation_address_ward') }},
              {{ getName(modelValue, 'adLocation_address_district') }},
              {{ getName(modelValue, 'adLocation_address_city') }},
              {{ getName(modelValue, 'adLocation_address_country') }}
            </p>
            <p>Kích thước: &nbsp{{ modelValue.ads.width }}m x {{ modelValue.ads.height }}m</p>
          </div>
          <!--  -->
          <div v-if="modelValue.adsLocation" class="card-body">
            <h5>Địa điểm đặt quảng cáo</h5>
            <p>{{ getName(modelValue, 'adLocation_address_streetLine1') }},
              {{ getName(modelValue, 'adLocation_address_streetLine2') }},
              {{ getName(modelValue, 'adLocation_address_ward') }},
              {{ getName(modelValue, 'adLocation_address_district') }},
              {{ getName(modelValue, 'adLocation_address_city') }},
              {{ getName(modelValue, 'adLocation_address_country') }}
            </p>
            <p>Hình thức quảng cáo: &nbsp{{ getName(modelValue, 'adsLocation_adsCategory_name') }}</p>
          </div>
        </div>
        <div class="card mb-2">
          <div v-if="modelValue && modelValue.report" class="card-body">
            <h5><strong>Tên người báo cáo: </strong>{{ modelValue.report.fullName }}</h5>
            <p><strong>Email: </strong>{{ modelValue.report.email }}</p>
            <p><strong>Nội dung báo cáo: </strong> <span v-html="modelValue.report.content"></span></p>
            <!-- <div v-if="item.report.images && item.report?.images.length" class="card-images"> -->
              <!-- TODO: get image -->
              <!-- <img v-for="(img, j) in item.report?.images" :key="j" :src="getFileUrl('./uploads/' + img)" alt=""> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
const props = defineProps({
  modelValue: {
    type: Object,
    default:() => {}
  }
})
</script>