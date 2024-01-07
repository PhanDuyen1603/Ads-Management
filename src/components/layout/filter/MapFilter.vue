<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <p>Tình trạng quy hoạch</p>
        <v-radio-group v-model="ratioCheck.isPlanned" inline>
          <v-radio label="Tất cả" :value="0"></v-radio>
          <v-radio label="Chưa quy hoạch" :value="1"></v-radio>
          <v-radio label="Đã quy hoạch" :value="2"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <p>Quảng cáo</p>
        <v-radio-group v-model="ratioCheck.countAds" inline>
          <v-radio label="Tất cả" :value="0"></v-radio>
          <v-radio label="Điểm đặt" :value="1"></v-radio>
          <v-radio label="Quảng cáo" :value="2"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <p>Báo cáo</p>
        <v-radio-group v-model="ratioCheck.reportsCount" inline>
          <v-radio label="Tất cả" :value="0"></v-radio>
          <v-radio label="ẩn" :value="1"></v-radio>
          <v-radio label="hiện" :value="2"></v-radio>
        </v-radio-group>
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
    type: Number,
    default: 0
  },
  adsLocation: {
    type: Number,
    default: 0
  },
  isPlanned: {
    type: Number,
    default: 0
  },
  reportsCount: {
    type: Number,
    default: 0
  },
})
const emits = defineEmits(['close'])

const ratioCheck = reactive({
  countAds: props.countAds,
  adsLocation: props.adsLocation,
  isPlanned: props.isPlanned,
  reportsCount: props.reportsCount,
})
const filterLocations = () => {
  emits('close', { value: ratioCheck })
}
</script>