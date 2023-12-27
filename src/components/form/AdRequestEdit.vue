<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      sync
      :form-data="form$ => form$.requestData"
      v-model="form"
    >
      <StaticElement>
        <h3>Yêu cầu chỉnh sửa</h3>
      </StaticElement>
      <TextareaElement name="reason" label="Nội dung" />
      <TextareaElement name="content" label="Lý do chỉnh sửa" />
      <ButtonElement name="submit" submits>
        gửi
      </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  defaultFormData: {
    type: Object,
    default: null
  },
  submitType: {
    type: String,
    default: 'create',
    validator:(x) => ['create', 'update', 'request'].includes(x)
  }
})
const { requestUpdateAd } = useAdvertise()
const handleSubmit = async (submitForm, el) => {
  submitForm.ads = props.defaultFormData._id
  await requestUpdateAd(submitForm)
  emits('close')
}
</script>