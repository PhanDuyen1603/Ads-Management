<template>
  <div class="wrap__body">
    <main class="main">
      <LayoutMapLeftMenu />
      <slot />
    </main>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/admin/plugins/bootstrap/css/bootstrap.min.css',
    }
  ],
});
</script>

<style>
.main {
  display: flex;
}
</style>