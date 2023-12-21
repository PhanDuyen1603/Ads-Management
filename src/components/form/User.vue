<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData" v-model="form"
      sync
    >
      <TextElement
        name="firstName"
        label="Họ và tên đệm"
        placeholder="Nhập họ và tên đệm"
        :columns="{ container: 6 }"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
        :submit="false"
      />
      <TextElement
        name="lastName"
        label="Tên"
        placeholder="Nhập tên"
        :columns="{ container: 6 }"
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
        label="email"
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
        value-prop="slug"
        :submit="false"
      />

      <SelectElement
        label="Phường"
        name="ward"
        :native="false"
        :items="listWards"
        :disabled="!form.district"
        label-prop="name"
        value-prop="slug"
        :submit="false"
      />

      <ButtonElement name="submit" add-class="mt-2" submits>
        {{ submitType === 'create' ? 'Tạo mới' : 'Cập nhật' }}
      </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script setup>
import { ROLES, ROLE_LABEL } from '~/constant/user'
import { districts } from '~/constant/location'

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

const form = reactive(props.defaultFormData && props.submitType !== 'create' ? props.defaultFormData : {})

const listWards = computed(() => form.district ? districts.find(x => x.slug === form.district)?.wards : [])

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
      submitForm.fullName = `${form?.firstName || ''} ${form?.lastName || ''}`
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

</script>