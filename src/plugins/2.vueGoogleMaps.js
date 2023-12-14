import { defineNuxtPlugin } from "#app";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import useGmapStore from "~/stores/gmap.store";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const $config = config.public;
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: $config.googleMapApiKey || 'AIzaSyDbL87HXftpb5uvQG8Z927vDBJgzZliVsk',
      libraries: "places"
    }
  });

  return {
    provide: {
      gMap: {
        changeMapCenter(location) {
          const $store = useGmapStore()
          $store.changeMapCenter(location)
        }
      }
    }
  }
});
