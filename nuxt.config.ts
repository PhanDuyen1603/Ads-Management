// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src',
  modules: [
    '@vueform/nuxt',
  ],
  build: {
    transpile: ['@fawmi/vue-google-maps']
  },
  alias: {
    '@constant': './src/constant'
  },
  app: {
    head: {
        link: [{ rel: 'icon', type: 'image/jpg', href: '/favicon.jpg' }]
    }
},
  runtimeConfig: {
    public: {
      googleMapApiKey: process.env.GOOGLE_MAP_API_KEY || ''
    }
  }
})
