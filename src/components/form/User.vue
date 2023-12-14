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
      />
      <TextElement
        name="lastName"
        label="Tên"
        placeholder="Nhập tên"
        :columns="{ container: 6 }"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
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
        name="dateOfBirth"
        label="Ngày sinh"
        placeholder="Nhập Ngày sinh"
        load-format="DD-MM-YYYY"
        value-format="DD-MM-YYYY"
        display-format="DD-MM-YYYY"
      />
      <SelectElement
        label="Quyền"
        name="roleId"
        :native="false"
        :items="roles"
      />

      <SelectElement
        label="Quận"
        name="district"
        :native="true"
        :items="districts"
        label-prop="name"
        value-prop="slug"
      />

      <SelectElement
        label="Phường"
        name="ward"
        :native="false"
        :items="listWards"
        :disabled="!form.district"
        label-prop="name"
        value-prop="slug"
      />

      <ButtonElement name="submit" add-class="mt-2" submits>
        {{ submitType === 'create' ? 'Tạo mới' : 'Cập nhật' }}
      </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script setup>
import useUsersStore from '~/stores/users.store'
import { districts } from '~/constant/location'

const props = defineProps({
  defaultFormData: {
    type: Object,
    default: null
  },
  submitType: {
    type: String,
    default: 'create',
    validator:(x) => ['create', 'update'].includes(x)
  }
})

const emits = defineEmits(['close'])

const usersStore = useUsersStore()
const form = reactive(props.defaultFormData && props.submitType === 'update' ? props.defaultFormData : {})

const listWards = computed(() => form.district ? districts.find(x => x.slug === form.district)?.wards : [])

await usersStore.getUserRoles()
const roles = computed(() => usersStore.roles)

const handleSubmit = async (form, $el) => {
  try {
    const endpoint = props.submitType === 'create' ? '/api/user/create' : `/api/user/${props.defaultFormData._id}`
    const options = {
      method: props.submitType === 'create' ? 'POST' : 'PUT',
      body: form,
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await $fetch(endpoint, options)
    emits('close')
  } catch (error) {
    console.log({error})
  }
}

</script>