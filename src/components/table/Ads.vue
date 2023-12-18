<template>
  <div class="table-responsive">
    <table class="table table-full">
      <thead>
        <tr>
          <th>#</th>
          <th v-for="(item, index) in Object.values(tableField)" :key="`head_${index}`" style="width: fit-content;">
            {{ item }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td v-for="(field, i) in Object.keys(tableField)" :key="i">
            {{ getName(item[field]) }}
          </td>
          <td v-if="userPermission.advertise.update">
            <button class="btn btn-success" @click="openDetailModal(item)">
              chỉnh sửa
            </button>
          </td>
          <td v-if="userPermission.advertise.request">
            <button class="btn btn-success" @click="openDetailModal(item)">
              yêu cầu chỉnh sửa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import getName from '~/utils/string/getName'
import { tableField } from '~/constant/ads'
const { userPermission } = useMapAdmin()

const { $modal } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array
  },
})

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyFormAdCreate',
    props: {
      defaultFormData: item,
      submitType: userPermission.value.advertise.update ? 'update' : 'request',
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}

</script>