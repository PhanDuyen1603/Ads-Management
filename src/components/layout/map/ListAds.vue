<template>
  <div class="list_items_wrap">
    <div class="list_items_horizontal">
      <div
          v-if="$route.query.entry === 'address'"
        v-for="(item, index) in dataList"
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
      <div
        v-if="$route.query.entry === 'ads'"
        v-for="(item, index) in ads"
        :key="index"
        class="card_horizontal_wrap"
      >
        <div class="card_horizontal" @click="focusMap(item)">
          <div class="card_image">
            <img :src="getFileUrl(Array.isArray(item.images) && item.images.length && item.images[0].path)" >
          </div>
          <div class="card_content">
            <div class="card_title">
              {{ item.title }}
            </div>
            <div class="card_desc">
              <span>Kích thước: &nbsp{{ item.width }}m x {{ item.height }}m</span>
              <span>Địa chỉ</span>
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
        <div class="info_body" v-if="target && target._id">
          <div class="info_image">
            <img :src="getFileUrl(Array.isArray(target.images) && target.images.length && target.images[0].path)" alt="..">
          </div>
          <div class="info">
            <div class="info_1">
              <div class="info_1_head">
                <strong>Thông tin quảng cáo</strong>
              </div>
              <div v-if="target.title" class="info_2_body">
                <p>Kích thước: &nbsp{{ target.width }}m x {{ target.height }}m</p>
                <p>{{ target.content }}</p>
                <p>Số lượng: 1 trụ/bảng</p>
<!--                TODO-->
                <p>Hình thức: thiếu</p>
              </div>
              <div v-if="target.title || target.content" class="info_2_action">
                <div class="action_groups">
                  <IconsInfoCircle style="cursor: pointer;" fill="blue" />
                  <div>
                    <button class="btn btn-outline-danger bt-alert" @click="openReportModal('ad')">
                      <IconsExclamationOctagon class="icon_danger" />
                      <span>Báo cáo vi phạm</span>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="info_1_body_empty">
                <p>Chưa có dữ liệu</p>
                <p>Vui lòng chọn bản đồ để xem</p>
              </div>
            </div>
            <div class="info_2">
              <div class="info_2_head">
                <strong>Thông tin địa điểm</strong>
              </div>
              <div v-if="target.streetLine1" class="info_2_body">
                <p>{{ target.title }}</p>
                <p>{{ target.streetLine1 }},</p>
                <p>{{ target.ward }}, {{ target.district }}, {{ target.city }}</p>
              </div>
              <div v-if="target.streetLine1" class="info_2_action">
                <div class="action_groups">
                    <IconsInfoCircle style="cursor: pointer;" fill="blue" />
                  <div>
                    <button class="btn btn-outline-danger bt-alert" @click="openReportModal('location')">
                      <IconsExclamationOctagon class="icon_danger" />
                      <span>Báo cáo vi phạm</span>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="info_1_body_empty">
                <p>Chưa có dữ liệu</p>
                <p>Vui lòng chọn bản đồ để xem</p>
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
import { mapAdsLocation } from '~/utils/mapData.js'
const props = defineProps({
  data: {
    type: Array,
    default:() => [],
  }
})
const { $gMap, $modal } = useNuxtApp()
const { getLocations, addresses } = useLocation()
const { getAds, ads } = useAdvertise()
const { getReportByIds, reports } = useAdReport()
const { getFileUrl } = useMedia()
const $route = useRoute()

const listType = computed(() => $route.query.entry || 'ads')

const showInfo = ref(false)
const target = ref({})

const components = {
  ads: 'ListAdsHorizontal',
  address: 'ListAdsHorizontal',
  reports: 'ListReports'
}

const dataList = ref([])

const getData = async (type) => {
  switch (type) {
    case 'ads':
      await getAds()
      dataList.value = ads.value
      break;

    case 'reports':
      const ids = window.localStorage.getItem('reports')
      console.log({ids})
      await getReportByIds(ids)
      dataList.value = reports.value
      break;

    default:
      await getLocations()
      dataList.value = addresses.value
      break;
  }
}

watch(listType, async (newX, oldX) => {
  await getData(newX)
})

const focusMap = (item) => {
  target.value = null
  let data = item
  if(item.address) {
    data = mapAdsLocation(item)
    $gMap.changeMapCenter(data.position)
  }

  target.value = data
  showInfo.value = true
}

const openReportModal = async (type) => {
  await $modal.show({
    component: 'FormCommonLocationReport',
    props: {
      addressId: type === 'location' && unref(target)._id,
      adId: type === 'ad' && unref(target)._id,
      updateType: type
    },
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
  await getData(listType.value)
})
</script>

<style lang="scss">
  .card_desc p {
    margin: 0
  }
</style>