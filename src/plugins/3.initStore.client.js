import { defineNuxtPlugin } from "#app";
import useMapStore from '~/stores/map.store'

export default defineNuxtPlugin(async (nuxtApp) => {
  // init mock data
  const $store = useMapStore()
  await $store.initLocations()
  await $store.initAdReports()
});
