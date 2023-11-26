<template>
  <div>
    <ElementGmap class="map" :map-styles="{
      width: '100%',
      height: '45rem'
    }" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>