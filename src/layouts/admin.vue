<template>
  <div class="fix-header fix-sidebar card-no-border">
    <div id="main-wrapper">
      <ThemeAdminHeader />
      <ThemeAdminLeftMenu />
      <div class="page-wrapper">
        <div class="container-fluid">
          <slot />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: '/admin/plugins/bootstrap/css/bootstrap.min.css',
    },
    {
      rel: 'stylesheet',
      href: '/admin/css/style.css',
    },
    {
      rel: 'stylesheet',
      href: '/admin/css/pages/dashboard.css',
    },
    {
      rel: 'stylesheet',
      href: '/admin/css/colors/default-dark.css',
    },
  ],
  script: [
    {
      key: 'bootstrap',
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
      integrity: 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM',
      crossorigin: 'anonymous',
      body: true,
      defer: true,
    },
    {
      src:'https://code.jquery.com/jquery-3.7.1.min.js',
      integrity: 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=',
      crossorigin: 'anonymous'
    },
    {
      src:'/admin/js/perfect-scrollbar.jquery.min.js'
    },
    {
      src:'/admin/js/waves.js'
    },
    {
      src:'/admin/js/sidebarmenu.js'
    },
    {
      src:'/admin/js/custom.min.js'
    },
  ]
});
</script>