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
          <TableUsers :data="dataList" :key="`user_${new Date()}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUsersStore from '~/stores/users.store'

const { $modal } = useNuxtApp()
definePageMeta({
  layout: 'admin'
})
const usersStore = useUsersStore()

await usersStore.getListUsers()
const dataList = computed(() => usersStore.list)

const addUserModal = async () => {
  await $modal.show({
    component: 'FormUser',
  })
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