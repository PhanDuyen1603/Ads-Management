<template>
  <div>
    <div
      :class="`captcha ${ direction === 'column' ? 'captcha-column' : 'captcha-row'}`"
    >
      <label v-if="showLabel" class="captcha-label" for="captcha">Captcha</label>
      <div class="captcha-svg">
        <span v-if="captcha" v-html="captcha.svg" />
      </div>
      <input
        id="captcha"
        type="text"
        class="captcha-input"
        @keydown.enter="() => submitOnEnter && submit"
        v-model="submission.captcha"
        @change="errorMessage = ''"
      />
    </div>
    <div v-if="message" class="captcha-message">{{ message }}</div>
    <div v-if="errorMessage" class="captcha-error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const props = defineProps({
  direction: {
    type: String,
    default: 'row',
    validator:(x) => ['column', 'row'].includes(x)
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  submitOnEnter: {
    type: Boolean,
    default: false
  },
})
const emits = defineEmits(['onSuccess', 'onFail'])
const toast = useToast()
const captcha = ref(null)
const submission = ref({
  name: '',
  captcha: '',
  uuid: '',
})
const message = ref('')
const errorMessage = ref('')

const getCaptcha = async () => {
  captcha.value = (await useFetch('/api/captcha/generate')).data.value
  submission.value.uuid = captcha.value.uuid
}

const submit = async () => {
  const { data } = await useFetch('/api/captcha/submit', {
    method: 'POST',
    body: submission.value,
  })
  if (data.value?.success) {
    toast.success(data.value?.message)
    message.value = 'Nhập captcha thành công'
    errorMessage.value = ''
    emits('onSuccess')
    return { value: true }
  } else {
    data.value.errors.map(e => toast.warning(e, { timeout: 1000 }))
    // message
    submission.value.captcha = ''
    message.value = ''
    errorMessage.value = 'Vui lòng nhập lại'
    getCaptcha()
    emits('onFail')
    return { value: false }
  }
}

onMounted(async () => {
  await getCaptcha()
})

defineExpose({ checkCaptcha: submit })
</script>

<style lang="scss">
.captcha {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.captcha-column {
    flex-direction: column;
  }
  &.captcha-row {
    flex-direction: row;
  }
  .captcha-label {
    width: 7.5rem
  }
  .captcha-svg {
    width: 10rem;
    height: 50px;
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    border-width: 1px;
    border-radius: 0.25rem;
    --tw-bg-opacity: 1;
    background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
    --tw-border-opacity: 1;
    border-color: rgba(75, 85, 99, var(--tw-border-opacity));
  }
  .captcha-input {
    height: 50px;
    background-color: #eee;
    border-color: #eee;
    border-radius: 0.25rem;
    border-width: 1px;
    width: 10rem;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
.captcha-message {
  font-size: .9rem;
  padding-left: 2rem;
  color: green
}
.captcha-error-message {
  font-size: .9rem;
  padding-left: 2rem;
  color: red
}
</style>