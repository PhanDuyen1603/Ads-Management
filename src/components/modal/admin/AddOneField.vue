<template>
  <div>
    <Vueform
      :endpoint="(form, el) => onSubmit(form, el)"
      :form-data="form$ => form$.requestData"
      v-model="form"
      sync
    >

      <TextElement
        name="name"
        label="Tên"
        placeholder="Name"
      />
      <ButtonElement name="submit" submits>
        Gửi
      </ButtonElement>
    </Vueform>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "Tên",
  },
  modelValue: {
    type: Object,
    default: null
  }
});
const emits = defineEmits(['onSubmit', 'close'])
const form = ref(props.modelValue)
const onSubmit = (form) => {
  emits('close', {value: form.name})
}
</script>
