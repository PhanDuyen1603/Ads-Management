<template>
  <div class="row">
    <div class="col-6">
      <div class="card">
        <button class="btn btn-outline-danger btn-add btn-add-custom" @click="">
          <IconsPlusCircle />
          <span>Thêm</span>
        </button>
        <div v-if="typeAds && typeAds.length" class="table-responsive">
          <table :class="['table', tableClass]">
            <thead>
            <tr>
              <th>#</th>
              <th>Loại hình quảng cáo</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, index) in typeAds"
                :class="`table-row-click ${ activeDistrict && activeDistrict._id && activeDistrict._id === item._id ? 'active-tr' : ''}`"
            >
              <td>{{ index + 1 }}</td>
              <td @click="activeDistrict = item">
                {{ item.name }}
              </td>
              <td style="width: 40px;">
                <v-icon size="small" class="me-2" @click="">
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
    <div class="col-6"></div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import useBillboardTypes from "~/composables/types/useBillboardTypes.js";
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

const { getBillboardTypes, createBillboardType, updateBillboardType } = useBillboardTypes();
const typeAds = ref([]);

await getBillboardTypes()

const initData = async () => {
  typeAds.value = await getBillboardTypes();
}

await initData()

console.log({getBillboardTypes: getBillboardTypes.value})
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
