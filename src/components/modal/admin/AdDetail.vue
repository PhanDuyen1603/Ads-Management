<template>
  <div class="modal_ad_detail">
    <div class="detail_item">
      <h4>Địa chỉ:</h4>
      <p>{{ address }}</p>
    </div>
    <div class="detail_item">
      <h4>Khu vực:</h4>
      <p>{{ areaType }}</p>
    </div>
    <div class="detail_item">
      <h4>Loại vị trí:</h4>
      <p>{{ positionType }}</p>
    </div>
    <div class="detail_item">
      <h4>Hình thức quảng cáo:</h4>
      <p>{{ advertisingType }}</p>
    </div>
    <div class="detail_item">
      <h4>Hình ảnh điểm đặt bảng quảng cáo:</h4>
      <p></p>
    </div>
    <div class="detail_item">
      <h4>Thông tin quy hoạch:</h4>
      <p>Chưa quy hoạch</p>
    </div>
    <div class="detail_item">
      <h4>Loại bảng quảng cáo:</h4>
      <p>Trụ bảng hiflex</p>
    </div>
    <div class="detail_item">
      <h4>Kích thước:</h4>
      <p>2.5x1m</p>
    </div>
    <div class="detail_item">
      <h4>Số lượng:</h4>
      <p>1</p>
    </div>
    <div>
      <ElementGmap
        class="map"
        :map-styles="{
          width: '100%',
          height: '300px'
        }"
        :center="position"
        :markers="[{ position }]"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  position: {
    type: Object,
    default:() => {}
  },
  address: {
    type: String,
    default: ''
  },
  areaType: {
    type: String,
    default: ''
  },
  positionType: {
    type: String,
    default: ''
  },
  advertisingType: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss">
.modal_ad_detail {
  display: flex;
  flex-direction: column;
  .detail_item {
    display: inline-flex;
    gap: 10px;
    h4 {
      font-weight: 600;
      font-size: 16px;
    }
    p {
      // font-size: 14px
    }
  }
}
</style>