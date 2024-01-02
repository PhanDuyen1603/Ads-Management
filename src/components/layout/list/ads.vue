<template>
  <!-- v-if="$route.query.entry === 'ads'"  -->
  <!-- TODO: loadings -->
  <div v-for="(item, index) in dataList" :key="index" class="card_horizontal_wrap">
    <div v-if="item.title" class="card_horizontal" @click="focusMap(item)">
      <div class="card_image">
        <img :src="getFileUrl(Array.isArray(item.images) && item.images.length && item.images[0].path)">
      </div>
      <div class="card_content">
        <div class="card_title">
          {{ item.title }}
        </div>
        <div class="card_desc">
          <p><strong>Kích thước:</strong> &nbsp{{ item.width }}m x {{ item.height }}m</p>
          <p><strong>Địa chỉ:</strong> {{item.adsLocation.address.streetLine1}}, {{item.adsLocation.address.streetLine2}}, quận {{item.adsLocation.address.district.name}}, thành phố {{item.adsLocation.address.city}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  dataList: {
    type: Array,
    defaultl:() => []
  }
})
const emits = defineEmits(['focus-item'])
const { getFileUrl } = useMedia()

const focusMap = (item) => {
  emits('focus-item', item)
}
</script>