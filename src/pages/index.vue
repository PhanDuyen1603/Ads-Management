<template>
  <div>
    <ThemeMapSection />
    <!-- <ElementGmap /> -->
    <button type="button" class="btn btn-primary" @click="testModal">Primary</button>
  </div>
</template>

<script setup>
const { $modal } = useNuxtApp()
const testModal = () => {
  $modal.alert({
    message: '1111',
    title: 'test'
  })
}
</script>