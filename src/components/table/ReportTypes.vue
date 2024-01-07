<template>
  <div class="card">
    <button
      class="btn btn-outline-danger btn-add btn-add-custom"
      @click="openCreateModal()"
    >
      <IconsPlusCircle />
      <span>Thêm</span>
    </button>
    <div v-if="ReportTypes && ReportTypes.length" class="table-responsive">
      <table :class="['table', tableClass]">
        <thead>
          <tr>
            <th>#</th>
            <th>Loại báo cáo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ReportTypes">
            <td>{{ index + 1 }}</td>
            <td @click="activeDistrict = item">
              {{ item.name }}
            </td>
            <td style="width: 40px">
              <v-icon size="small" class="me-2" @click="openUpdateModal(item)">
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
</template>

<script setup>
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

const { getReportTypes, createReportType, updateReportType, ReportTypes } =
  useReportTypes();

await getReportTypes();

const openCreateModal = async () => {
  const newVal = await $modal.show({
    component: "ModalAdminAddOneField",
  });
  if (!newVal.value) return;
  await createReportType(newVal.value);
  await getReportTypes();
};
const openUpdateModal = async (item) => {
  const newDistrict = await $modal.show({
    component: "ModalAdminAddOneField",
    props: {
      modelValue: {
        name: item.name,
      },
    },
  });
  if (!newDistrict.value.name === item.name) return;
  await updateReportType(item._id, newDistrict.value);
  await getReportTypes();
};
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
