<template>
  <div class="list_items_horizontal">
    <div
      v-for="(item, index) in addresses"
      :key="index"
      class="card_horizontal_wrap"
    >
      <div class="card_horizontal" @click="focusMap(item)">
        <div class="card_image">
          <img :src="faker.image.urlPicsumPhotos()" alt="..">
        </div>
        <div class="card_content">
          <div class="card_title">
            {{ item.streetLine1 }}
          </div>
          <div class="card_desc">
            <span>{{ item.ward }}</span>
            <span>{{ item.district }}</span>
            <span>{{ item.city }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMapStore from '~/stores/map.store'
import { faker } from '@faker-js/faker';
const props = defineProps({
  data: {
    type: Array,
    default:() => []
  }
})
const { $gMap } = useNuxtApp()
const mapStore = useMapStore()

await mapStore.getAddressesList()
const addresses = computed(() => mapStore.gMapAddress)

const focusMap = (item) => {
  $gMap.changeMapCenter(item.position)
}

</script>
<style lang="scss">
  .card_horizontal_wrap {
    padding: 12px;
    .card_horizontal {
      display: flex;
      border-radius: 16px;
      gap: 1rem;
      padding: 12px;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
      &.active {
        background-color: rgba(60,64,67,0.12)
      }
      .card_image {
        display: inline-block;
        height: 64px;
        width: 64px;
        position: relative;
        img {
          border-radius: 8px;
          height: 64px;
          width: 64px;
        }
      }
      .card_content {

      }
      .card_title {
        font-family: "Google Sans",Roboto,Arial,sans-serif;
        line-height: 1.5rem;
        font-size: 1rem;
        letter-spacing: 0;
        font-weight: 500;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .card_desc {
        font-family: Roboto,Arial,sans-serif;
        line-height: 1.25rem;
        font-size: 0.875rem;
        letter-spacing: 0;
        font-weight: 400;

        display: flex;
        gap: 8px;
      }
    }
  }
</style>