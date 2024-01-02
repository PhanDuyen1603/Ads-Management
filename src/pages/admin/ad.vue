<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div v-if="userPermission.advertise.create && userPermission.address.create" class="card-header">
          <button class="btn btn-outline-danger btn-add" @click="addAdsModal()">
            <IconsPlusCircle />
            <span>Thêm {{ isShowAdsList ? 'quảng cáo' : 'điểm đặt  quảng cáo' }}</span>
          </button>
        </div>
        <!-- <ul class="filter-list">
          <li v-for="(item, index) in filters.districts" :key="index" class="filter-badget">
            <input
              type="checkbox"
              :id="item.slug"
              :value="item.label"
              v-model="checkedDistrict"
            >
            <label for="filter-1">{{ item.label }}</label>
          </li>
        </ul> -->
        <div>Checked names: {{ checkedNames }}</div>

        <div v-for="item in ['jack', 'john', 'mike']">
          <input type="checkbox" :id="item" :value="item" v-model="checkedNames">
          <label for="jack">item</label>
        </div>

        <!-- <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>

        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>

        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label> -->

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
          <TableLocations v-if="!isShowAdsList" :data="dataList" :key="`location_${new Date()}`" @refresh="initData()" />
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
const { getAds, ads } = useAdvertise()
const { getLocations, addresses } = useLocation()
const isShowAdsList = ref(false)
await getLocations()

const filters = ref({
  districts: [
    {
      label: 'quan 1',
      selected: false,
      slug: 'quan1'
    },
    {
      label: 'quan binh thanh',
      selected: true,
      slug: 'quanbinhthanh'
    },
  ]
})

const checkedNames = ref([])

const dataList = computed(() => !isShowAdsList.value ? unref(addresses) : unref(ads))

const initData = async () => {
  if(isShowAdsList.value) await getAds()
  else await getLocations()
}

const showAddressList = async () => {
  if(!isShowAdsList.value) return
  isShowAdsList.value = false
  await initData()
}

const showAdsList = async () => {
  if(isShowAdsList.value) return
  isShowAdsList.value = true
  await initData()
}

const test = (tes) => {
  console.log({tes})
}

const addAdsModal = async (item) => {
  await $modal.show({
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
  await initData()
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
.filter-list {
  list-style: none;
  padding: 0;
}

.filter-list li {
  display: inline-block;
  margin-right: 10px;
}

.filter-list input[type="checkbox"] {
  display: none; /* Hide the default checkbox */
}

.filter-list label {
  /* Style the label to resemble a badge */
  background-color: #eee;
  padding: 5px 10px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.filter-list input[type="checkbox"]:checked + label {
  /* Style the checked badge differently */
  background-color: #007bff;
  color: white;
}

.filter-badget {
  [type=checkbox]+label:before,
  [type=checkbox]+label:after {
    content: unset;
  }
}
</style>