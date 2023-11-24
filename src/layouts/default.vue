<template>
  <div class="wrap__body">
    <!-- <WelcomeScreen></WelcomeScreen> -->
    <main class="main">
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