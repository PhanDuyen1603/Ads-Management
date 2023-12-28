<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <button class="btn btn-outline-danger btn-add" @click="addUserModal()">
            <IconsPlusCircle />
            <span>Thêm user</span>
          </button>
        </div>
        <div class="card-body">
          <TableUsers :data="staffs" :key="`user_${new Date()}`" />
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
const { getStaffs, staffs } = useStaff()
await getStaffs()

const addUserModal = async () => {
  await $modal.show({
    component: 'FormUser',
  })
  await getStaffs()
}
</script>
<style>
.detail_icon {
  cursor: pointer;
}
.nav-item {
  cursor: pointer;
}
</style>