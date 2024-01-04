<template>
  <div class="list_items_wrap">
    <div class="list_items_horizontal">
      <!-- list location -->
      <LayoutListLocations v-if="$route.query.entry === 'address' && dataList" :dataList="dataList" @focus-item="focusMap" />
      <!-- list ads -->
      <LayoutListAds v-if="$route.query.entry === 'ads' && dataList" :dataList="dataList" @focus-item="focusMap" />
      <!-- list report -->
      <LayoutListReports v-if="$route.query.entry === 'reports' && dataList" :dataList="dataList" @focus-item="showReportDetail" />
    </div>
    <div class="item_info" v-show="showInfo">
      <div class="info_wrap">
        <div class="close_circle_icon" @click="showInfo = false">
          <IconsCloseCircle />
        </div>
        <LayoutDetailBoxLocation v-if="target && target._id && $route.query.entry !== 'reports'" :modelValue="target" />
        <LayoutDetailBoxReport v-if="$route.query.entry === 'reports'" :modelValue="target" />
      </div>
    </div>
  </div>
</template>

<script setup>
import './leftmenu.scss'
import { mapAdsLocation, dataMapAdsWithLocation } from '~/utils/mapData.js'
const props = defineProps({
  data: {
    type: Array,
    default:() => [],
  }
})
const { $gMap } = useNuxtApp()
const { addresses, getLocation, filterLocations } = useLocation()
const { ads, getBillboardType, filterAd } = useAdvertise()
const { getReportByGuest } = useAdReport()
const { getReportByGuest: getAdLocationReportByGuest } = useAdLocationReport()
const $route = useRoute()

const listType = computed(() => $route.query.entry || 'ads')
const showInfo = ref(false)
const target = ref({})
const dataList = ref([])

const getData = async (type) => {
  target.value = {}
  showInfo.value = false
  switch (type) {
    case 'ads':
      dataList.value = ads.value
      break;

    case 'reports':
      dataList.value = []
      dataList.value = [...dataList.value, ...await getAdLocationReportByGuest()]
      dataList.value = [...dataList.value, ...await getReportByGuest()]
      break;

    default:
      dataList.value = dataMapAdsWithLocation(addresses.value, ads.value)
      break;
  }
}

watch(listType, async (newX) => {
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
    $gMap.changeMapCenter({
      lat: item.adsLocation?.address.lat,
      lng: item.adsLocation?.address.long
    })
    showInfo.value = true
  }
}

const onSearch = async (str) => {
  const type = $route.query.entry
  if (type === 'ads') {
    dataList.value = await filterAd(str)
  } else if (type === 'address') {
    dataList.value = await filterLocations(str)
  }
}

onMounted(async () => {
  await getData(listType.value)
})
defineExpose({ onSearch })
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