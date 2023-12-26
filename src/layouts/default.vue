<template>
  <div class="wrap__body">
    <main class="main">
      <LayoutMapLeftMenu />
      <slot />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
.main {
  display: flex;
}
</style>