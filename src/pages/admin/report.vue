<template>
  <div class="card-body">
    <div class="table-responsive">
      <table v-if="reports.length" class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th v-for="(item, idnex) in tableField" :key="index">
              {{ mapReportKey[item] ? mapReportKey[item] : item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in reports" :key="index" @click="openDetailModal(item)">
            <td>{{ index + 1 }}</td>
            <td v-for="(field, i) in tableField" :key="i">
              <div v-if="!field.startsWith('ad_')">{{ item[field] }}</div>
              <div v-else>{{ mapStore.getAdInfo(item.ad, field.split('_')[1] || '') }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { mapReportKey } from '~/utils/generateAdReports'
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
const tableField = ['createdAt', 'ad_address', 'userName', 'phone', 'reportType', 'status']
const openDetailModal = async (item) => {
  await $modal.show({
    component: 'LazyModalAdminReportDetail',
    props: {...item},
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
}
</script>