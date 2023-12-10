<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav">
        <ul id="sidebarnav">
          <li v-for="(item, index) in menus" :key="index" :class="`${activeMenu === item.name ? 'active' : ''}`">
            <NuxtLink
              :to="{ name: item.name }"
              :class="`waves-effect waves-dark`"
              aria-expanded="false"
            >
              <i :class="item.icon"></i>
              <span class="hide-menu">{{ item.title }}</span>
            </NuxtLink>
          </li>
          <li>
            <a class="waves-effect waves-dark" href="pages-error-404.html" aria-expanded="false">
              <i class="mdi mdi-help-circle"></i>
              <span class="hide-menu">404</span></a>
          </li>
        </ul>
      </nav>
      <!-- End Sidebar navigation -->
  </div>
  <!-- End Sidebar scroll-->
</aside></template>

<script setup>
const route = useRoute()
const menus = [
  {
    title: 'Tổng quan',
    name: 'admin',
    icon: 'mdi mdi-earth',
    rule: 'all'
  },
  {
    title: 'Profile',
    name: 'admin-profile',
    icon: 'mdi mdi-account-check',
    rule: 'all'
  },
  {
    title: 'Danh sách quảng cáo/ điểm đặt quảng cáo',
    name: 'admin-ad',
    icon: 'mdi mdi-table',
    rule: 'all'
  },
  {
    title: 'Danh sách báo cáo',
    name: 'admin-report',
    icon: 'mdi mdi-table',
    rule: 'all'
  },
  {
    title: 'Danh sách cty cấp phép',
    name: 'admin-companny',
    icon: 'mdi mdi-table',
    rule: 'all'
  },
  {
    title: 'Danh sách người dùng',
    name: 'admin-users',
    icon: 'mdi mdi-table',
    rule: 'all'
  },
]
const activeMenu = ref(route.name)
watch(() => route.name, (newRouteName, oldRouteName) => {
  const menu = menus.filter(x => x.name === newRouteName)
  if(menu.length) {
    activeMenu.value = menu[0].name
  }
});
</script>