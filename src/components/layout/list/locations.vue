<template>
  <div
    v-for="(item, index) in dataList"
    :key="index"
    class="card_horizontal_wrap"
  >
  <!-- TODO: loading -->
    <div v-if="item.adsCategory" class="card_horizontal" @click="focusMap(item)">
      <div class="card_image">
        <img :src="getRandomLocationImage()" alt="..">
      </div>
      <div class="card_content">
        <div class="line-clamp-1 card_title">
          {{ item.address?.streetLine1 }},&nbsp {{ item.address?.streetLine2 }}
        </div>
        <div class="card_desc">
          <span><strong>Phường: </strong>{{ getName(item, 'address_ward') }},&nbsp</span>
          <span><strong>Quận: </strong>{{ getName(item, 'address_district') }},&nbsp</span><br/>
          <span><strong>Thành phố: </strong>{{ item.address.city }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
const props = defineProps({
  dataList: {
    type: Array,
    defaultl:() => []
  }
})
const emits = defineEmits(['focus-item'])
const { getRandomLocationImage } = useMedia()

const focusMap = (item) => {
  emits('focus-item', item)
}
</script>