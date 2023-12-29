<template>
  <div class="row">
  <!-- Column -->
  <div class="col-lg-4 col-xlg-3">
    <div class="card">
      <div class="card-body" style="text-align: center;">
        <div class="mt-4"> <img src="/admin/images/users/5.jpg" class="img-circle" width="150" />
          <h4 class="card-title mt-2">{{ profileDetail?.fullName }}</h4>
        </div>
      </div>
    </div>
  </div>
  <!-- Column -->
  <!-- Column -->
  <div class="col-lg-8 col-xlg-9">
    <div class="card">
      <div class="card-body">
        <FormUser
          :defaultFormData="profileDetail"
          submitType="authUpdate"
          @handle-update="handleUpdate"
        />
      </div>
    </div>
  </div>
  <!-- Column -->
</div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
const { profile } = useAuth()
const { getStaff, updateStaff } = useStaff()
const { data: profileDetail, error } = await useAsyncData('profile', () => getStaff(profile.value._id))

const handleUpdate = async ({value}) => {
  await updateStaff(value)
  await getStaff(profile.value._id)
}
</script>