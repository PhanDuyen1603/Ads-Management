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
        <div class="info_body" v-if="data && (data.id || data._id)">
          <div class="info_image">
            <img :src="faker.image.urlPicsumPhotos()" alt="..">
          </div>
          <div class="info">
            <!-- ads -->
            <div class="info_2">
              <div class="info_2_head">
                <strong>Thong tin dia diem</strong>
              </div>
              <div class="info_2_body">
                <p>{{ data.title }}</p>
                <p>{{ data.streetLine1 }}</p>
                <p>{{ data.ward }} {{ data.district }}, {{ data.city }}</p>
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
            <!-- ads -->
            <div class="info_1">
              <div class="info_1_head">
                <strong>Thông tin quảng cáo</strong>
              </div>
              <div v-if="!(ads && ads.length)" class="info_1_body_empty">
                <p>Chua co du lieu</p>
                <p>vui long chon ban do de xem</p>
              </div>
              <div v-else class="info_1_body_empty">
                <!--  -->
                <div v-for="(item, index) in ads" :key="index" class="ad_info">
                  <h3>{{ getName(item.billboardType) }}</h3>
                  <p>{{ item.address.streetLine1 }}</p>
                  <p>kich thuoc: {{ item.width }} x {{ item.height }}</p>
                  <p>so luong: <strong>1 tru/bang</strong></p>
                  <p>hinh thuc: <strong>{{ getName(item.adCategory) }}</strong></p>
                  <p>phan loai: <strong>dat cong</strong></p>
                  <div class="action_groups">
                      <IconsInfoCircle fill="blue" />
                    <div>
                      <button class="btn btn-outline-danger bt-alert">
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
import { faker } from '@faker-js/faker';
import getName from '~/utils/string/getName'
import useMapStore from '~/stores/map.store'

const { $modal } = useNuxtApp()
const mapStore = useMapStore()

const data = computed(() => mapStore.target)
const ads = computed(() => mapStore.targetAds)

const openReportModal = async () => {
  await $modal.show({
    component: 'FormCommonLocationReport',
    props: {},
    wrapperProps: {
      styles: {
        maxWidth: '650px',
        width: '100%',
      }
    }
  })
}

</script>