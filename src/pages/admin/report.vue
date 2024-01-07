<template>
  <ClientOnly>
    <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <ul class="nav nav-pills nav-fill mb-2 nav-blue">
            <li class="nav-item" @click="showAddressList()">
              <div :class="`nav-link ${ !isShowAdsList ? 'active' : ''}`">
                Báo cáo địa điểm
              </div>
            </li>
            <li class="nav-item" @click="showAdsList()">
              <div :class="`nav-link ${ isShowAdsList ? 'active' : ''}`">
                Báo cáo danh sách quảng cáo
              </div>
            </li>
          </ul>
          <div class="table-responsive">
            <table v-if="isShowAdsList && reports && reports.length" class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th v-for="(item, idnex) in tableField" :key="index">
                    {{ mapReportKey[item] ? mapReportKey[item] : item }}
                  </th>
                  <th>
                    {{ mapReportKey.report_status }}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in reports" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td v-for="(field, i) in tableField" :key="i">
                    <div>{{ getName(item, field) }}</div>
                  </td>
                  <td>
                    <div>{{ item.report.status ? status[item.report.status] : status[0] }}</div>
                  </td>
                  <td>
                    <button class="btn btn-success" @click="openDetailModal(item, 'ad')">Chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <table v-if="!isShowAdsList && adLocationReports && adLocationReports.length" class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th v-for="(item, idnex) in tableField" :key="index">
                    {{ mapReportKey[item] ? mapReportKey[item] : item }}
                  </th>
                  <th>
                    {{ mapReportKey.report_status }}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in adLocationReports" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td v-for="(field, i) in tableField" :key="i">
                    <div>{{ getName(item, field) }}</div>
                  </td>
                  <td>
                    <div>{{ item.status ? status[item.status] : status[0] }}</div>
                  </td>
                  <td>
                    <button class="btn btn-success" @click="openDetailModal(item, 'location')">Chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>

  </ClientOnly>
</template>

<script setup>
import { mapReportKey } from '~/utils/generateAdReports'
import getName from '~/utils/getter/getName'
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
const { $modal } = useNuxtApp()
const { getReports, reports } = useAdReport()
const { getReports: getAdLocationsReports, reports: adLocationReports } = useAdLocationReport()
await getReports()
await getAdLocationsReports()
const isShowAdsList = ref(false)

const showAddressList = () => {
  isShowAdsList.value = false
}
const showAdsList = () => {
  isShowAdsList.value = true
}

const tableField = ['report_createdAt', 'report_fullName', 'report_phone', 'report_reportType']
const status = {
  0: 'Chưa duyệt',
  1: 'Chờ duyệt',
  2: 'Đã duyệt'
}

const openDetailModal = async (item, type = 'location') => {
  await $modal.show({
    component: 'LazyModalAdminReportDetail',
    props: {
      modelValue: item,
      type
    },
    wrapperProps: {
      styles: {
        width: '650px'
      }
    }
  })
  await getReports()
  await getAdLocationsReports()
}
</script>