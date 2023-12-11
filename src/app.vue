<template>
  <ModalContainer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import useModalStore from '~/stores/modal.store'

const modalStore = useModalStore()
useHead({
  bodyAttrs: {
    class: computed(() => {
      if (modalStore.list.length) return 'modal-open';
      return '';
    }),
  },
})
</script>
