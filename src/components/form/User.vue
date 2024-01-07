<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData" v-model="form"
      sync
    >
      <TextElement
        name="fullName"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
        :submit="false"
      />

      <TextElement
        name="username"
        label="Tên đăng nhập"
        placeholder="Nhập tên đăng nhập"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
        :submit="submitType === 'create'"
        :disabled="submitType !== 'create'"
        :readonly="submitType !== 'create'"
      />
      <TextElement
        name="email"
        label="Email"
        placeholder="Nhập email"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
      />
      <TextElement
        name="phone"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
      />
      <DateElement
        name="dob"
        label="Ngày sinh"
        placeholder="Nhập Ngày sinh"
        load-format="DD-MM-YYYY"
        value-format="DD-MM-YYYY"
        display-format="DD-MM-YYYY"
      />

      <SelectElement
        label="Quyền"
        name="role"
        :native="false"
        :items="roles"
        :submit="submitType === 'create'"
        :disabled="submitType !== 'create'"
        :readonly="submitType !== 'create'"
      />

      <SelectElement
        label="Quận"
        name="district"
        :native="true"
        :items="districts"
        label-prop="name"
        value-prop="_id"
        :submit="false"
        disabled
        readonly
        :columns="{ container: 6 }"
      />

      <SelectElement
        label="Phường"
        name="ward"
        :native="false"
        :items="listWards"
        label-prop="name"
        value-prop="_id"
        disabled
        readonly
        :submit="false"
        :columns="{ container: 6 }"
      />

      
      <ButtonElement full name="submit" submits :columns="{ container: 3, wrapper: 12 }">
        {{ submitType === 'create' ? 'Tạo mới' : 'Cập nhật' }}
      </ButtonElement>
      <ButtonElement v-if="['authUpdate'].includes(submitType)" full @click="openChangePasswordModal" name="changepass" :columns="{ container: 3, wrapper: 12 }">
        đổi mật khẩu
      </ButtonElement>
      
    </Vueform>
  </ClientOnly>
</template>

<script setup>
import { ROLES, ROLE_LABEL } from '~/constant/user'

const props = defineProps({
  defaultFormData: {
    type: Object,
    default: null
  },
  submitType: {
    type: String,
    default: 'create',
    validator:(x) => ['create', 'update', 'authUpdate'].includes(x)
  }
})

const emits = defineEmits(['close', 'handle-update'])
const { createStaff } = useStaff()
const { $modal } = useNuxtApp()
const { getWards, getDistricts } = useLocation();

const districts = await getDistricts();
const wards = await getWards();

const form = reactive(props.defaultFormData && props.submitType !== 'create' ? props.defaultFormData : {})

const listWards = computed(() => form.district ? wards.filter(x => x.district?._id === form.district) : [])

const roles = Object.keys(ROLES).map(key => {
  return {
    label: ROLE_LABEL[key],
    value: ROLES[key]
  }
})

const handleSubmit = async (submitForm, $el) => {
  try {
    if (props.submitType === 'create') {
      submitForm.password = '123456'
      const res = await createStaff(submitForm)
      if(res.success) {
        emits('close')
        alert('tao nguoi dung thanh cong')
      }
    } else if (props.submitType === 'authUpdate') {
      emits('handle-update', {value: submitForm})
    } else {
      const res = await updateStaff(submitForm)
      if(res.success) {
        emits('close')
        alert('cap nhap nguoi dung thanh cong')
      }
    }
  } catch (error) {
    console.log({error})
  }
}

const openChangePasswordModal = async () => {
  await $modal.show({
    component: 'ModalAdminChangePassword'
  })
}

</script>