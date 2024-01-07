<template>
  <v-container class="text-center">
    <v-row justify="center">
      <!-- <v-col cols="12">
        <v-switch
          v-model="filters.countAds"
          hide-details
          inset
          color="primary"
          :label="`${ filters.countAds ? 'Hiện' : 'Ẩn' } bảng quảng cáo`"
          @update:modelValue="changeCountAds"
        />
      </v-col> -->
      <!-- <v-col cols="12"> -->
        <!-- <v-switch
          v-model="filters.adsLocation"
          hide-details
          inset
          color="primary"
          :label="`${ filters.adsLocation ? 'Hiện' : 'Ẩn' } điểm đặt`"
        />
      </v-col> -->
      <v-col cols="12">
        <v-switch
          v-model="filters.reportsCount"
          hide-details
          inset
          color="primary"
          :label="`${ filters.reportsCount ? 'Hiện' : 'Ẩn' } Báo cáo`"
          @update:modelValue="changeReport"
        />
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="filters.isPlanned"
          hide-details
          inset
          color="primary"
          :label="`Thông tin quy hoạch: ${ filters.isPlanned ? 'Đã quy hoạch' : 'Chưa quy hoạch' }`"
          @update:modelValue="changeIsplanned"
        />
      </v-col>
      <v-col cols="12">
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-btn block rounded="lg" @click="filterLocations">Lọc</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  countAds: {
    type: Boolean,
    default: true
  },
  adsLocation: {
    type: Boolean,
    default: true
  },
  isPlanned: {
    type: Boolean,
    default: true
  },
  reportsCount: {
    type: Boolean,
    default: true
  },
})
const emits = defineEmits(['close'])
const filters = reactive({
  countAds: props.countAds,
  adsLocation: props.adsLocation,
  isPlanned: props.isPlanned,
  reportsCount: props.reportsCount,
})

const changeCountAds = (e) => {
  if(!e) {
    filters.isPlanned = true,
    filters.reportsCount = true
  }
}
const changeIsplanned = (e) => {
  if(!e) {
    filters.countAds = true,
    filters.reportsCount = true
  }
}
const changeReport = (e) => {
  if(!e) {
    filters.isPlanned = true,
    filters.countAds = true
  }
}
const filterLocations = () => {
  emits('close', { value: filters })
}
</script>