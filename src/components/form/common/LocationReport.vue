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
        placeholder="Email"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
      />

      <TextElement
        name="phone"
        label="Số điện thoại"
        placeholder="Điện thoại liên lạc"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
      />

      <EditorElement
        name="content"
        label="Nội dung báo cáo"
        :accept="['image/png', 'image/jpeg']"
      />

      <Button name="submit" add-class="mt-2" submits>
        {{ submitType === 'create' ? 'Tạo mới' : 'Cập nhật' }}
      </Button>
    </Vueform>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  addressId: {
    type: String,
    default: ''
  },
  adId: {
    type: String,
    default: ''
  },
  updateType: {
    type: String,
    default: 'address',
    validator:(x) => ['address', 'ad'].includes(x)
  }
})
const form = reactive({})
const handleSubmit = () => {}
</script>