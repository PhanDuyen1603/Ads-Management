<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div v-if="userPermission.advertise.create || userPermission.address.create" class="card-header">
          <button class="btn btn-outline-danger btn-add" @click="addAdsModal()">
            <IconsPlusCircle />
            <span>Thêm {{ isShowAdsList ? 'quảng cáo' : 'điểm đặt  quảng cáo' }}</span>
          </button>
        </div>
        <div class="card-body">
          <ul class="nav nav-pills nav-fill mb-2 nav-blue">
            <li class="nav-item" @click="showAddressList()">
              <div :class="`nav-link ${ !isShowAdsList ? 'active' : ''}`">
                Điểm đặt quảng cáo
              </div>
            </li>
            <li class="nav-item" @click="showAdsList()">
              <div :class="`nav-link ${ isShowAdsList ? 'active' : ''}`">
                Danh sách quảng cáo
              </div>
            </li>
          </ul>
          <TableLocations v-if="!isShowAdsList" :data="dataList" :key="`location_${new Date()}`" />
          <TableAds v-else :data="dataList" :key="`ad_${new Date()}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $modal } = useNuxtApp()
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
const { userPermission } = useAuth()
const { getAds, ads, getAdsLocations, adsLocations } = useAdvertise()
const isShowAdsList = ref(false)
// await getAds()
await getAdsLocations()

const dataList = computed(() => !isShowAdsList.value ? unref(adsLocations) : unref(ads))

const showAddressList = async () => {
  if(!isShowAdsList.value) return
  isShowAdsList.value = false
  await getAdsLocations()
}

const showAdsList = async () => {
  if(isShowAdsList.value) return
  isShowAdsList.value = true
  await getAds()
}

const addAdsModal = async (item) => {
  const result = await $modal.show({
    component: isShowAdsList.value ? 'FormAdCreate' : 'FormLocationCreate',
    props: {
      info: item
    },
    wrapperProps: {
      styles: {
        'max-width': '650px',
        width: '100%',
        'overflow-y': isShowAdsList.value ? 'unset' : 'scroll'
      }
    }
  })
}
</script>
<style lang="scss">
.detail_icon {
  cursor: pointer;
}
.nav-item {
  cursor: pointer;
}
.nav-blue {
  .nav-link.active, .show>.nav-link {
    background-color: #06d79c;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
}
.btn-add {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>