<template>
  <div class="modal__wrapper">
    <div class="modal__content" :style="{ maxWidth: maxWidth, ...styles }">
      <slot/>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
defineProps({
  maxWidth: {
    type: String,
    default: '650px'
  },
  styles: {
    type: Object,
    default:() => {}
  }
})
const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  min-width: 500px;
  max-width: calc(100vw - 2rem);
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  vertical-align: middle;
  display: inline-block;
  text-align: initial;
  overflow-y: scroll;
  max-height: calc(100vh - 10%);
}
.modal-overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
}
.modal__head {
  margin-bottom: 1rem;
}
.modal__body,
.modal__footer {
  padding: 0 1rem
}
</style>