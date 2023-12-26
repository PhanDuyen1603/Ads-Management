<template>
  <div class="map_right_menu">
    <ul class="menu_items">
      <li class="menu_item active_menu" @click="navigate({ query: { entry: 'address' }})">
        <span><IconsGeoAlt style="height: 25px; width: 25px;"/></span>
        <span>Địa điểm</span>
      </li>
      <li class="menu_item" @click="navigate({ query: { entry: 'ads' }})">
        <span><IconsAdvertise style="height: 25px; width: 25px;"/></span>
        <span>Quảng cáo</span>
      </li>
      <li class="menu_item" @click="navigate({ query: { entry: 'reports' }})">
        <span><IconsReport style="height: 25px; width: 25px;"/></span>
        <span>Báo cáo</span>
      </li>
      <li class="menu_item" @click="navigate({ modal: loginModal, path: '/admin' })">
        <span><IconsProfileCircle style="height: 25px; width: 25px;"/></span>
        <span>Hồ sơ</span>
      </li>
    </ul>
    <div :class="['map_tab_content', { active: showTabContet }]">
      <div class="map_search_bar">
        <div class="search_bar_wrap">
          <input
            type="text"
            placeholder="Tìm kiếm địa điểm đặt quảng cáo"
            v-model="searchStr"
            @input="handleSearch"
          />
          <div class="icon search_icon">
            <IconsSearch fill="#70757a" />
          </div>
          <div class="icon close_icon" @click="hideTab">
            <IconsCloseCircle fill="#70757a" />
          </div>
        </div>
      </div>
      <div class="list_addresses">
        <component
          :is="resolveComponent(contentComponent)"
          :data="contentData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { resolveComponent } from 'vue';
import { useDebounceFn } from '@vueuse/core'

const { target } = useLocation()
const { $modal } = useNuxtApp()
const { profile } = useAuth()
const $router = useRouter()
const $route = useRoute()
const showTabContet = ref(false)

const hideTab = () => {
  showTabContet.value = false
  $router.push({
      path: '/',
      query: {},
    });
}

// menu and navigate
const loginModal = {
  component: 'LayoutLogin',
  path: '/admin',
  showOnLogin: false,
  wrapperProps: {
    styles: {
      background: 'unset',
      maxWidth: '700px',
      width: '100%'
    }
  }
}

const navigate = async ({ query = {}, modal = {}, path = '/' }) => {
  showTabContet.value = false
  if(modal && modal.component && (!modal.showOnLogin && !profile.value?._id)) {
    await $modal.show({
      ...modal
    })
  } else {
    $router.push({
      path,
      query,
    });
    if(!modal.component) showTabContet.value = true
  }
}

//  menu content
const listComponents = {
  default: 'LayoutMapListAds',
  profile: 'LayoutMapProfile',
  detail: 'LayoutMapDetail'
}

const contentComponent = ref(listComponents.default)

// dynamic data for dynamic component
const contentData = computed(() => {
  if(contentComponent.value === listComponents.detail) return target.value
  return []
})

// watch query string
watch(() => $route.query, (val) => {
  if(val && val.entry) return contentComponent.value = listComponents.default;
  if(val && val.detail) {
    contentComponent.value = listComponents.detail
    showTabContet.value = true
    return
  }
});

// search
const searchStr = ref('')

const handleSearch = useDebounceFn((event) => {
  // do something
}, 1000)

</script>

<style lang="scss">
.map_right_menu {
  height: 100vh;
  position: relative;
  .menu_items {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    padding-top: 30px;

    height: 100%;
    width: 80px;
  }
  .menu_item {
    color: #70757a;
    margin-left: 8px;
    margin-right: 8px;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer
  }

  .map_tab_content {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    position: absolute;
    top: 0;
    left: 80px;
    z-index: 100;

    width: 0;
    height: 100%;
    background: #fff;
    transition-property: width;
    transition-duration: .2s;
    transition-timing-function: linear;
    .map_search_bar, .list_addresses {
      opacity: 0;
      transition: all .2s ease;
    }
    &.active {
      width: 400px;
      .map_search_bar, .list_addresses {
        opacity: 1
      }
    }
  }

  .map_search_bar {
    padding: 15px;
    .search_bar_wrap {
      position: relative;
      background: #fff;
      border-radius: 24px;
      box-sizing: border-box;
      width: 370px;
      height: 48px;
      border: 1px solid #dadce0;
      padding: 11px;
      padding-right: 110px;

      display: flex;

      input {
        font-size: 15px;
        padding: 0!important;
        border: 0;
        border-radius: 0;
        width: 100%;
        &:focus{
          outline: none;
          border-color: inherit;
          -webkit-box-shadow: none;
          box-shadow: none;
        }
      }

    }
    .icon {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 0;
      cursor: pointer;
      svg {
        width: 25px;
        height: 25px;
      }
      &.search_icon {
        right: 48px;
      }
    }
  }
}
.active_menu {

}
</style>