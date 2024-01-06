<template>
  <div
    class="list_items_wrap"
    style="--el-width: 100%;
      --el-height: 100%;
      --el-position: relative;
      --el-top: 0;
      --el-right: 0;"
    >
    <div class="item_info">
      <div class="info_wrap">
        <div class="info_body" v-if="target && (target.id || target._id)">
          <div v-if="target.photos && target.photos.length" class="info_image">
            <img :src="target.photos[0]" alt="..">
          </div>
          <div v-else class="info_image">
            <img :src="getRandomLocationImage()" alt="..">
          </div>
          <div class="info">
            <!-- ads -->
            <div class="info_2">
              <div class="info_2_head">
                <strong>Thông tin địa điểm</strong>
              </div>
              <div class="info_2_body">
                <p>{{ target.title }}</p>
                <p>{{ target.streetLine1 }}, {{ target.streetLine2 }}</p>
                <p>{{ getName(target, 'ward') }} {{ getName(target, 'district') }}, {{ target.city }}</p>
              </div>
              <div class="info_2_action">
                <div class="action_groups">
                    <IconsInfoCircle style="cursor: pointer;" fill="blue" />
                  <div>
                    <button class="btn btn-outline-danger bt-alert" @click="openReportModal">
                      <IconsExclamationOctagon class="icon_danger" />
                      <span>Báo cáo vi phạm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- ads -->
            <div class="info_1">
              <div class="info_1_head">
                <strong>Thông tin quảng cáo</strong>
              </div>
              <div v-if="!(target.ads && target.ads.length)" class="info_1_body_empty">
                <p>Chưa có dữ liệu</p>
              </div>
              <div v-else class="info_1_body_empty">
                <!--  -->
                <div v-for="(item, index) in target.ads" :key="index" class="ad_info">
                  <h3>{{ getName(item, 'billboardType') }}</h3>
                  <!-- <p>{{ getName(item, 'adsLocation_address_streetLine1') }}</p> -->
                  <p>Kích thước: {{ item.width }} x {{ item.height }}</p>
                  <p>Số lượng: <strong>1 tru/bang</strong></p>
                  <p>Hình thức: <strong>{{ getName(item, 'adsLocation_adCategory') }}</strong></p>
                  <p>Phân loại: <strong>{{ locationTypes.find(x => x._id === item.adsLocation.locationType).name }}</strong></p>
                  <div class="action_groups">
                      <IconsInfoCircle fill="blue" />
                    <div>
                      <button class="btn btn-outline-danger bt-alert" @click="openReportModal('ad')">
                        <span>
                          <IconsExclamationOctagon fill="red" />
                        </span>
                        <span>Báo cáo vi phạm</span>
                      </button>
                    </div>
                  </div>
                </div>
                <!--  -->
              </div>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import getName from '~/utils/getter/getName';
import locationTypes from '~/constant/app/locationTypes'

const { $modal } = useNuxtApp()
const { target } = useLocation()
const { getRandomLocationImage } = useMedia()

const openReportModal = async (type = 'location') => {
  const props = {
    updateType: type,
    modelValue: target.value
  }
  if(type === 'location') props.addressId = unref(target)._id
  if(type === 'ad') props.adId = unref(target).ads?.[0]._id
  await $modal.show({
    component: 'FormCommonLocationReport',
    props,
    wrapperProps: {
      styles: {
        maxWidth: '650px',
        width: '100%',
      }
    }
  })
}
</script>

<style lang="scss">
.ad_info {
  h3 {
    font-size: 1.3rem;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #dadce0;
  }
}
</style>