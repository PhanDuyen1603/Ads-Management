<template>
  <div class="modal_ad_detail">
    <div class="detail_item">
      <h4>Địa chỉ:</h4>
      <p>{{ getFullAddress(modelValue) }}</p>
    </div>
    <div class="detail_item">
      <h4>Loại vị trí:</h4>
      <p>{{ getName(modelValue, 'locationType') }}</p>
    </div>
    <div class="detail_item">
      <h4>Thông tin quy hoạch:</h4>
      <p>{{ isPlanned ? 'Đã quy hoạch' : 'Chưa quy hoạch' }}</p>
    </div>
    <div class="detail_item">
      <h4>Loại bảng quảng cáo:</h4>
      <p>{{ getName(modelValue, 'adsCategory') }}</p>
    </div>
    <div>
      <ElementGmap
        class="map"
        :map-styles="{
          width: '100%',
          height: '300px'
        }"
        :center="modelValue.position"
        :markers="[modelValue]"
      />
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
import { getFullAddress } from '~/utils/location/address'
const props = defineProps({
  modelValue: {
    type: Object,
    default:() => {}
  },
})
</script>

<style lang="scss">
.modal_ad_detail {
  display: flex;
  flex-direction: column;
  .detail_item {
    display: inline-flex;
    gap: 10px;
    margin-bottom: .5rem;
    h4 {
      font-weight: 600;
      font-size: 1rem;
      margin: 0;
    }
    p {
      font-size: .9rem;
      margin: 0;
    }
  }
}
</style>