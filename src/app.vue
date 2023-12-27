<template>
  <ModalContainer />
  <NuxtLayout>
    <NuxtLoadingIndicator color="#348feb" :height="5" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import useModalStore from '~/stores/modal.store'
import "vue-toastification/dist/index.css";

const modalStore = useModalStore()
useHead({
  bodyAttrs: {
    class: computed(() => {
      if (modalStore.list.length) return 'modal-open';
      return '';
    }),
  },
  link: [
    {
      rel: 'stylesheet',
      href: '/admin/plugins/bootstrap/css/bootstrap.min.css',
    },
    {
      rel: 'stylesheet',
      href: '/admin/css/colors/default-dark.css',
    },
  ]
})
</script>
