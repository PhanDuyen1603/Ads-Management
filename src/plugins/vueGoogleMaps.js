import { defineNuxtPlugin } from "#app";
import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const $config = config.public;
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: $config.googleMapApiKey || 'AIzaSyDbL87HXftpb5uvQG8Z927vDBJgzZliVsk'
    }
  });
});
