<template>
  <div class="modal_ad_detail">
    <div class="detail_item mb-2">
      <h4>{{ reportType }}</h4>
    </div>
    <div class="detail_item">
      <h4>Họ và tên người gửi:</h4>
      <p>{{ userName }}</p>
    </div>
    <div class="detail_item">
      <h4>Số điện thoại: </h4>
      <p>{{ phone }}</p>
    </div>
    <div class="detail_item">
      <h4>Email:</h4>
      <p>{{ advertisingType }}</p>
    </div>

    <div class="detail_item">
      <h4>Nội dung báo cáo:</h4>
      <p>{{ advertisingType }}</p>
    </div>
    <div class="detail_item">
      <h4>Hình ảnh minh hoạ:</h4>
      <p>{{ advertisingType }}</p>
    </div>

    <div class="detail_item">
      <h4>Trạng thái xử lý: </h4>
      <p>Đang xử lý</p>
    </div>
    <!-- <div class="detail_item">
      <h4>Hình ảnh điểm đặt bảng quảng cáo:</h4>
      <p></p>
    </div> -->
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
    <div class="modal_ad_btns">
      <div class="btn btn-success">Gửi</div>
      <div class="btn btn-danger">Đóng</div>
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