import Toast from "vue-toastification";

export default defineNuxtPlugin(async (nuxtApp) => {

  const options = {
    // You can set your default options here
  };
  nuxtApp.vueApp.use(Toast, options)

  return {
  }
});
