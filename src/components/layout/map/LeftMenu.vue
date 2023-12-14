<template>
  <div class="map_right_menu">
    <ul class="menu_items">
      <li class="menu_item" @click="navigate('address')">
        <span><IconsGeoAlt style="height: 25px; width: 25px;"/></span>
        <span>dia diem</span>
      </li>
      <li class="menu_item" @click="navigate('ads')">
        <span><IconsAdvertise style="height: 25px; width: 25px;"/></span>
        <span>quang cao</span>
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
          <div class="icon close_icon" @click="showTabContet = false">
            <IconsCloseCircle fill="#70757a" />
          </div>
        </div>
      </div>
      <div class="list_addresses">
        <component :is="resolveComponent(listComponents.default)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { resolveComponent } from 'vue';
import { useDebounceFn } from '@vueuse/core'
const $router = useRouter()
const showTabContet = ref(false)

const listComponents = {
  default: 'LayoutMapListAds'
}

const navigate = (x) => {
  $router.push({
    path: '/',
    query: { entry: x },
  });
  showTabContet.value = true
}

// search
const searchStr = ref('')

const handleSearch = useDebounceFn((event) => {
  // do something
  console.log({event})

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
</style>