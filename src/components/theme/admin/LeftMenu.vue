<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav">
        <ul id="sidebarnav">
          <li
            v-for="(item, index) in adminMenu" :key="index"
            :class="`${activeMenu === item.name ? 'active' : ''}`"
          >
            <NuxtLink
              :to="{ name: item.name }"
              :class="`waves-effect waves-dark`"
              v-if="roleMenuCondition(item?.roles || [], userRole)"
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
          <li>
            <a class="waves-effect waves-dark" aria-expanded="false" @click="logOut()">
              <i class="mdi mdi-logout"></i>
              <span class="hide-menu">Đăng suất</span></a>
          </li>
        </ul>
      </nav>
      <!-- End Sidebar navigation -->
  </div>
  <!-- End Sidebar scroll-->
</aside></template>

<script setup>
import { adminMenu } from '~/constant/layout/admin/leftMenu'
import { roleMenuCondition } from '~/utils/auth'
const route = useRoute()
const router = useRouter()
const { role: userRole, signOut } = useAuth()

const activeMenu = ref(route.name)
const logOut = () => {
  signOut()
  router.push({ path: '/' })
}
//
watch(() => route.name, (newRouteName, oldRouteName) => {
  const menu = adminMenu.filter(x => x.name === newRouteName)
  if(menu.length) {
    activeMenu.value = menu[0].name
  }
});
</script>