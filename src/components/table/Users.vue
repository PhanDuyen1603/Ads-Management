<template>
  <div class="table-responsive">
    <table class="table table-overflow">
      <thead>
        <tr>
          <th>#</th>
          <th>Họ và tên</th>
          <th v-for="(item, index) in Object.values(tableField)" :key="`head_${index}`" style="width: fit-content;">
            {{ item }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td>
            {{ item.firstName + ' ' + item.lastName }}
          </td>
          <td v-for="(field, i) in Object.keys(tableField)" :key="i">
            {{ item[field] }}
          </td>
          <td>
            <button class="btn btn-danger" @click="openRemoveModal(item)">
              xoá
            </button>
          </td>
          <td>
            <button class="btn btn-success" @click="openDetailModal(item)">
              chỉnh sửa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onFocusMap } from '~/utils/map'
import getName from '~/utils/string/getName'
import { tableField } from '~/utils/dataMap/user'

const { $modal } = useNuxtApp()
const props = defineProps({
  data: {
    type: Array
  },
  $map: {
    type: Object,
    default:() => {}
  }
})

const focusMap = () => {
  onFocusMap({ lat: item.lat, lng: item.lng }, $map)
}

const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyFormUser',
    props: {
      defaultFormData: item,
      submitType: 'update'
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}

const openRemoveModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminUserRemoveModal',
    props: {
      data: item,
    }
  })
}

</script>