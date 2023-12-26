<template>
  <div class="list_items_wrap">
    <div class="list_items_horizontal">
      <!-- TODO: seperate component list location -->
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
            <div class="line-clamp-1 card_title">
              {{ item.address.streetLine1 }}
            </div>
            <div class="card_desc">
              <span><strong>Phường: </strong>{{ getName(item, 'address_ward') }},&nbsp</span>
              <span><strong>Quận: </strong>{{ getName(item, 'address_district') }},&nbsp</span><br/>
              <span><strong>Thành phố: </strong>{{ item.address.city }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: seperate component list ads -->
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
      <!-- TODO: seperate component list report -->
      <div v-if="$route.query.entry === 'reports' && dataList.length" class="reports">
        <div v-for="(item, index) in dataList" :key="index" class="card card-report">
          <div v-if="item.report?.fullName" class="card-body">
            <h5 v-if="item.ads" class="card-title">{{ item.ads.title }}</h5>
            <h5 v-if="item.adsLocation?.address" class="card-title">{{ item.adsLocation.address.streetLine1 }}</h5>
            <p class="card-date">Ngày gửi: {{ formatDate(item.report?.createdAt) }}</p>
            <p class="card-text"><span>Nội dung: </span><span v-html="item.report?.content || '<div></div>'" /></p>
            <!-- <div v-if="item.report.images && item.report?.images.length" class="card-images"> -->
              <!-- TODO: get image -->
              <!-- <img v-for="(img, j) in item.report?.images" :key="j" :src="getFileUrl('./uploads/' + img)" alt=""> -->
            <!-- </div> -->
            <button class="btn btn-outline-primary" @click="showReportDetail(item)">Xem chi tiết</button>
          </div>
        </div>
      </div>

    </div>
    <div class="item_info" v-show="showInfo">
      <div class="info_wrap">
        <div class="close_circle_icon" @click="showInfo = false">
          <IconsCloseCircle />
        </div>
        <div class="info_body" v-if="target && target._id && $route.query.entry !== 'reports'">
          <div class="info_image">
            <img :src="getFileUrl(Array.isArray(target.images) && target.images.length && target.images[0].path)" alt="..">
          </div>
          <div class="info">
            <div class="info_1">
              <div class="info_1_head">
                <strong>Thông tin quảng cáo</strong>
              </div>
              <div v-if="target.title" class="info_2_body">
                <!-- TODO: missing information -->
                <p>Kích thước: &nbsp{{ target.width }}m x {{ target.height }}m</p>
                <p>{{ target.content }}</p>
                <p>Số lượng: 1 trụ/bảng</p>
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
                <p>Phường {{ getName(target, 'ward') }}, Quận {{ getName(target, 'district') }}, {{ target.city }}</p>
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
        <div class="info_body" v-if="$route.query.entry === 'reports'">
          <div class="info dialog report_info">
            <div class="info_1_head">
              <strong>Thông tin báo cáo</strong>
            </div>
            <div class="info_1_body">
              <div class="card mb-2">
                <!-- TODO: seperate component -->
                <div v-if="target.ads && target.adLocation" class="card-body">
                  <h5>{{ target.ads.title }}</h5>
                  <p>{{ target.ads.content }}</p>
                  <p>{{ target.adLocation.address.streetLine1 }},
                    {{ getName(target, 'adLocation_address_ward') }},
                    {{ getName(target, 'adLocation_address_district') }},
                    {{ target.adLocation.address.city }},
                    {{ target.adLocation.address.country }}
                  </p>
                  <p>Kích thước: &nbsp{{ target.ads.width }}m x {{ target.ads.height }}m</p>
                </div>
                <!--  -->
                <div v-if="target.adsLocation" class="card-body">
                  <h5>Địa điểm đặt quảng cáo</h5>
                  <p>{{ target.adsLocation.address.streetLine1 }},
                    {{ target.adsLocation.address.ward }},
                    {{ target.adsLocation.address.district }},
                    {{ target.adsLocation.address.city }},
                    {{ target.adsLocation.address.country }}
                  </p>
                  <p>Hình thức quảng cáo: &nbsp{{ target.adsLocation.adsCategory.name }}</p>
                </div>
              </div>
              <div class="card mb-2">
                <div v-if="target && target.report" class="card-body">
                  <h5><strong>Tên người báo cáo: </strong>{{ target.report.fullName }}</h5>
                  <p><strong>Email: </strong>{{ target.report.email }}</p>
                  <p><strong>Nội dung báo cáo: </strong> <span v-html="target.report.content"></span></p>
                  <!-- <div v-if="item.report.images && item.report?.images.length" class="card-images"> -->
                    <!-- TODO: get image -->
                    <!-- <img v-for="(img, j) in item.report?.images" :key="j" :src="getFileUrl('./uploads/' + img)" alt=""> -->
                  <!-- </div> -->
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
import { mapAdsLocation } from '~/utils/mapData.js'
import getName from '~/utils/getter/getName';
const props = defineProps({
  data: {
    type: Array,
    default:() => [],
  }
})
const { $gMap, $modal, $dayjs } = useNuxtApp()
const { getLocations, addresses, getLocation } = useLocation()
const { getAds, ads, getBillboardType } = useAdvertise()
const { getReportByIds, reports } = useAdReport()
const { getReportByIds: getAdLocationReportByIds } = useAdLocationReport()
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

const formatDate = (date) => $dayjs(date).format('DD-MM-YYYY')

const getData = async (type) => {
  target.value = {}
  showInfo.value = false
  switch (type) {
    case 'ads':
      await getAds()
      dataList.value = ads.value
      break;

    case 'reports':
      dataList.value = []
      const ids = window.localStorage.getItem('reports')
      const ids_location = window.localStorage.getItem('reports_location')
      ids && ids.length && await getReportByIds(ids)
      dataList.value = [...dataList.value, ...await getAdLocationReportByIds(ids_location)]
      dataList.value = [...dataList.value, ...await getReportByIds(ids)]
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

const showReportDetail = async (item) => {
  if(item.ads) {
    const adLocation = item.ads.adsLocation && await getLocation(item.ads.adsLocation)
    const billboardType = item.ads.billboardType && await getBillboardType(item.ads.billboardType)
    target.value = {
      ...item,
      _id: item.report._id,
      adLocation,
      billboardType
    }
    showInfo.value = true
  } else {
    target.value = {
      ...item,
      _id: item.report._id,
    }
    showInfo.value = true
  }
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
  .reports {
    padding: 15px;
  }
  .card-report {
    .card-title {
      font-weight: 700;
    }
    .card-text {
      display: inline-flex;
      margin-bottom: 1rem
    }
    .card-date {
      font-size: .6rem;
      color: gray;
      margin-bottom: .5rem;
    }
    .card-body {
      display: flex;
      flex-direction: column;
    }
  }
  .report_info {
    p {
      font-size: .8rem;
      margin-bottom: .5rem;
    }
    h5 {
      font-size: 1rem;
    }
  }
</style>