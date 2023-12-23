<template>
  <div class="list_items_wrap">
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
              {{ item.address.streetLine1 }}
            </div>
            <div class="card_desc">
              <span>{{ item.address.ward }},&nbsp</span>
              <span>{{ item.address.district }},&nbsp</span>
              <span>{{ item.address.city }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item_info" v-show="showInfo">
      <div class="info_wrap">
        <div class="close" @click="showInfo = false">
          <IconsCloseCircle />
        </div>
        <div class="info_body" v-if="target && target.id">
          <div class="info_image">
            <img :src="faker.image.urlPicsumPhotos()" alt="..">
          </div>
          <div class="info">
            <div class="info_1">
              <div class="info_1_head">
                <strong>Thông tin quảng cáo</strong>
              </div>
              <div class="info_1_body_empty">
                <p>Chưa có dữ liệu</p>
                <p>Vui lòng chọn bản đồ để xem</p>
              </div>
            </div>
            <div class="info_2">
              <div class="info_2_head">
                <strong>Thông tin địa điểm</strong>
              </div>
              <div class="info_2_body">
                <p>{{ target.title }}</p>
                <p>{{ target.streetLine1 }},</p>
                <p>{{ target.ward }}, {{ target.district }}, {{ target.city }}</p>
              </div>
              <div class="info_2_action">
                <div class="action_groups">
                    <IconsInfoCircle style="cursor: pointer;" fill="blue" />
                  <div>
                    <button class="btn btn-outline-danger bt-alert" @click="openReportModal()">
                      <IconsExclamationOctagon class="icon_danger" />
                      <span>Báo cáo vi phạm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import './leftmenu.scss'
import { faker } from '@faker-js/faker';
import useAdvertise from "~/composables/useAdvertise.js";
const props = defineProps({
  data: {
    type: Array,
    default:() => [],
  }
})
const { $gMap, $modal } = useNuxtApp()
const { getLocations, addresses } = useLocation()
const { getAds, ads } = useAdvertise()

const showInfo = ref(true)
const target = ref({})

const focusMap = (item) => {
  $gMap.changeMapCenter(item.position)
  showInfo.value = true
  $modal.clear()
  console.log(item)
  target.value = item
}

const openReportModal = async () => {
  await $modal.show({
    component: 'FormCommonLocationReport',
    props: {},
    wrapperProps: {
      styles: {
        maxWidth: '650px',
        width: '100%',
        'overflow-y': 'unset'
      }
    }
  })
}

onMounted(async () => {
  await getLocations()
  await getAds()
})
</script>