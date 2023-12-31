<template>
  <div class="modal_ad_detail">
    <div class="detail_item">
      <h4>Tên bảng QC:</h4>
      <p>{{ getName(modelValue, 'title') }}</p>
    </div>
    <div class="detail_item">
      <h4>Nội dung:</h4>
      <p>{{ getName(modelValue, 'content') }}</p>
    </div>
    <div class="detail_item">
      <h4>Địa chỉ:</h4>
      <p>{{ getFullAddress(modelValue) }}</p>
    </div>
    <div class="detail_item">
      <h4>Loại bảng QC:</h4>
      <p>{{ getName(modelValue, 'billboardType') }}</p>
    </div>
    <div class="detail_item">
      <h4>Loại vị trí:</h4>
      <p>{{ getName(modelValue, 'adsLocation_locationType') }}</p>
    </div>
    <div class="detail_item">
      <h4>Kích thước:</h4>
      <p>{{ `${ +modelValue.width / 100 } x ${ +modelValue.height / 100 }m` }}</p>
    </div>
    <div class="detail_item">
      <h4>Giá:</h4>
      <p>{{ getName(modelValue, 'price') }}</p>
    </div>
    <div v-if="modelValue.images" class="detail_item">
      <h4>Hình ảnh:</h4>
      <div class="group_images">
        <img v-for="(image, index) in modelValue.images" :key="index" :src="getFileUrl(image.path)" alt="">
      </div>
    </div>
    <div>
      <ElementGmap
        class="map"
        :map-styles="{
          width: '100%',
          height: '300px'
        }"
        :center="address?.position"
        :markers="[address]"
      />
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
import { mapAdsLocation } from '~/utils/mapData'

const props = defineProps({
  modelValue: {
    type: Object,
    default:() => {}
  },
})
const { getFileUrl } = useMedia()
const address = computed(() => mapAdsLocation(props.modelValue.adsLocation))
console.log({
  address: address.value
})
const getFullAddress = (item) => {
  return `${getName(item, 'adsLocation_address_streetLine1') } ${ getName(item, 'adsLocation_address_streetLine2') },
    ${ getName(item, 'adsLocation_address_ward') },
    ${ getName(item, 'adsLocation_address_district') },
    ${ getName(item, 'adsLocation_address_city') },
    ${ getName(item, 'adsLocation_address_country') }`
}
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
  .group_images {
    display: flex;
    gap: 20px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 6px;
    }
  }
}
</style>