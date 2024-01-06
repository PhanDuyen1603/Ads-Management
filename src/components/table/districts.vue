<template>
  <div class="row">
    <div class="col-5">
      <div class="card">
        <button class="btn btn-outline-danger btn-add btn-add-custom" @click="addDistrict()">
          <IconsPlusCircle />
          <span>Thêm</span>
        </button>
        <div class="table-responsive">
          <table :class="['table', tableClass]">
            <thead>
              <tr>
                <th>#</th>
                <th>Quận</th>
                <th></th>
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item, index) in districts" 
                :class="`table-row-click ${ activeDistrict && activeDistrict._id && activeDistrict._id === item._id ? 'active-tr' : ''}`"
              >
                <td>{{ index + 1 }}</td>
                <td @click="activeDistrict = item">
                  {{ item.name }}
                </td>
                <td style="width: 40px;">
                  <v-icon size="small" class="me-2" @click="changeDistrictName(item)">
                    mdi-pencil
                  </v-icon>
                </td>
                <!-- <td style="width: 40px;">
                  <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="card">
        <button 
          class="btn btn-outline-danger btn-add btn-add-custom"
          :class="`${activeDistrict && activeDistrict._id ? '' : 'btn-add-hide'}`" 
          @click="addWard()"
        >
          <IconsPlusCircle />
          <span>Thêm</span>
        </button>
        <div class="table-responsive">
          <table :class="['table', tableClass]">
            <thead>
              <tr>
                <th>#</th>
                <th>Phường</th>
                <th></th>
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in activeWards">
                <td>{{ index + 1 }}</td>
                <td>
                  {{ item.name }}
                </td>
                <td style="width: 40px;">
                  <v-icon size="small" class="me-2" @click="changeWardName(item)">
                    mdi-pencil
                  </v-icon>
                </td>
                <!-- <td style="width: 40px;">
                  <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const { $modal } = useNuxtApp();
const emits = defineEmits(["refresh"]);
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  tableClass: {
    type: String,
    default: "",
  },
  showUpdateBtn: {
    type: Boolean,
    default: true,
  },
});

const { getDistricts, getWards, createDistrict, updateDistrict, createWard, updateWard } = useLocation();
const toast = useToast()
const districts = await getDistricts();
const wards = await getWards()

const activeDistrict = ref(null)

const activeWards = computed(() => {
  if(activeDistrict.value && activeDistrict.value._id) {
    return wards.filter(x => x.district._id === activeDistrict.value._id)
  } 
  return wards
})

const addDistrict = async () => {
  const newDistrict = await $modal.show({
    component: 'ModalAdminAddOneField'
  })
  if(!newDistrict.value) return
  await createDistrict(newDistrict.value)
  await getDistricts()
}
const changeDistrictName = async (item) => {
  const newDistrict = await $modal.show({
    component: 'ModalAdminAddOneField',
    props: {
      modelValue: {
        name: item.name
      }
    }
  })
  console.log(newDistrict.value)
  if(!newDistrict.value.name === item.name) return
  await updateDistrict(item._id, newDistrict.value)
  await getDistricts()
}

const addWard = async () => {
  if(!activeDistrict.value) {
    return toast.warning("Bạn cần chọn 1 quận", {
      timeout: 2000,
    })
  }
  const newWard = await $modal.show({
    component: 'ModalAdminAddOneField'
  })
  if(!newWard.value) return
  await createWard({ name: newWard.value, district: activeDistrict.value._id})
  // await getDistricts()
}

const changeWardName = async (item) => {
  const newWard = await $modal.show({
    component: 'ModalAdminAddOneField',
    props: {
      modelValue: {
        name: item.name
      }
    }
  })
  if(!newWard.value.name === item.name) return
  await updateWard(item._id, newWard.value)
}
</script>

<style>
.active-tr {
  background-color: lightblue;
}
.table-row-click {
  cursor: pointer;
}
.table-row-click:not(.active-tr):hover {
  background-color: #edf0f5;
}
.btn-add-custom {
  max-width: 100px;
}
.btn-add-hide {
  background-color: gray;
  border-color: gray;
  color: #fff;
  pointer-events: none;
}
</style>
