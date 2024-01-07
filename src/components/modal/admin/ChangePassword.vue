<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      sync
      :form-data="(form$) => form$.requestData"
      v-model="form"
    >

      <TextElement
        name="password"
        rules="required"
        input-type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
      />
      
      <TextElement
        name="passwordRepeat"
        rules="required"
        input-type="password"
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
      />
      <ButtonElement name="submit" submits >
        Đổi mật khẩu
      </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script setup>
import { useToast } from "vue-toastification";
const form = ref(null);
const toast = useToast()
const { updateStaff } = useStaff()
const emits = defineEmits(['close'])

const handleSubmit = async (form, el) => {
  if(form.password !== form.passwordRepeat) {
    return toast.error("Mật khẩu mới không khớp", {
      timeout: 2000
    })
  }
  await updateStaff({
    password: form.password
  })
  emits('close')
}
</script>
