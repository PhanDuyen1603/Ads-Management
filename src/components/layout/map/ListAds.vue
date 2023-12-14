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
                <p>Chua co du lieu</p>
                <p>vui long chon ban do de xem</p>
              </div>
            </div>
            <div class="info_2">
              <div class="info_2_head">
                <strong>Thong tin dia diem</strong>
              </div>
              <div class="info_2_body">
                <p>{{ target.title }}</p>
                <p>{{ target.streetLine1 }}</p>
                <p>{{ target.ward }} {{ target.district }}, {{ target.city }}</p>
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
import useMapStore from '~/stores/map.store'
import { faker } from '@faker-js/faker';
const props = defineProps({
  data: {
    type: Array,
    default:() => []
  }
})
const { $gMap, $modal } = useNuxtApp()
const mapStore = useMapStore()

await mapStore.getAddressesList()
const addresses = computed(() => mapStore.gMapAddress)

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

      }
    }
  })
}

</script>
<style lang="scss">
.list_items_wrap {
  position: relative;
  .item_info {
    width: 350px;
    min-width: 350px;
    max-height: 550px;
    position: absolute;
    top: -40px;
    right: -380px;
    border-radius: 16px;
    background-color: #fff;
    overflow: auto;
  }
  .info_wrap {
    position: relative;
    .close {
      position: absolute;
      cursor: pointer;
      color: rgba(255,255,255,1.0);


      top: 15px;
      right: 15px;
      z-index: 10;
      svg {
        -webkit-transition: all 0.35s ease-in-out;
        -moz-transition: all 0.35s ease-in-out;
        transition: all 0.35s ease-in-out;
        text-shadow: -1px 1px 2px #333;
        width: 25px;
        height: 25px;
      }
    }
  }
  .info_body {
    .info_image {
      position: relative;
      padding-top: 250px;
      overflow: hidden;
      width: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .info {
    padding: 15px;
  }
  .info_1 {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #dadce0;
  }
  .info_1_head, .info_2_head {
    margin-bottom: 1rem;
  }
  .info_1_body_empty, .info_2_body {
    p {
      font-size: 14px;
      margin-bottom: .5rem;
    }
    p:first-child {
      font-weight: 700;
    }
  }
}
.list_items_horizontal {
  max-height: calc(100vh - 80px);
  overflow-y: scroll;
}
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
.action_groups {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      .icon_danger {
        fill: #fff !important;
      }
    }
    .icon_danger {
      fill: red
    }
  }
}
</style>