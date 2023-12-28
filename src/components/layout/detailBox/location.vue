<template>
  <!--  v-if="modelValue && modelValue._id && $route.query.entry !== 'reports'" -->
  <div class="info_body">
    <div class="info_image">
      <img :src="getFileUrl(Array.isArray(modelValue.images) && modelValue.images.length && modelValue.images[0].path)" alt="..">
    </div>
    <div class="info">
      <div class="info_1">
        <div class="info_1_head">
          <strong>Thông tin quảng cáo</strong>
        </div>
        <div v-if="modelValue.title" class="info_2_body">
          <!-- TODO: missing information -->
          <p>Kích thước: &nbsp{{ modelValue.width }}m x {{ modelValue.height }}m</p>
          <p>{{ modelValue.content }}</p>
          <p>Số lượng: 1 trụ/bảng</p>
          <p>Hình thức: thiếu</p>
        </div>
        <div v-if="modelValue.title || modelValue.content" class="info_2_action">
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
        <div v-if="modelValue.streetLine1" class="info_2_body">
          <p>{{ modelValue.title }}</p>
          <p>{{ modelValue.streetLine1 }}, {{ modelValue.streetLine2 }}</p>
          <p>Phường {{ getName(modelValue, 'ward') }}, Quận {{ getName(modelValue, 'district') }}, {{ modelValue.city }}</p>
        </div>
        <div v-if="modelValue.streetLine1" class="info_2_action">
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
</template>

<script setup>
import getName from '~/utils/getter/getName';
const props = defineProps({
  modelValue: {
    type: Object,
    default:() => {}
  }
})
const { getFileUrl } = useMedia()

const openReportModal = async (type) => {
  await $modal.show({
    component: 'FormCommonLocationReport',
    props: {
      addressId: type === 'location' && props.modelValue?._id,
      adId: type === 'ad' && props.modelValue?._id,
      updateType: type
    },
    wrapperProps: {
      styles: {
        maxWidth: '650px',
        width: '100%',
      }
    }
  })
}
</script>