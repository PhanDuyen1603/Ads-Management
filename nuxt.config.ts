// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src',
  components: {
    dirs: [
      {
        global: true,
        path: '~/components',
        extensions: ['vue'],
      },
      {
        global: true,
        path: '~/components/global',
        pathPrefix: false,
        extensions: ['vue'],
      },
    ]
  },
  modules: [
    '@vueform/nuxt',
    '@pinia/nuxt',
    'nuxt-mongoose',
    '@vueuse/nuxt',
  ],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
  },
  build: {
    transpile: ['@fawmi/vue-google-maps']
  },
  alias: {
    '@constant': './src/constant'
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/jpg', href: '/favicon.jpg' }],
      script: [{ src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', integrity: 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM', crossorigin: 'anonymous'}]
    }
  },
  css: [
    // 'bootstrap/dist/css/bootstrap.min.css',
    // '~/styles/reset.css',
    '~/styles/_app.scss',
  ],
  runtimeConfig: {
    public: {
      googleMapApiKey: process.env.GOOGLE_MAP_API_KEY || '',
      baseURL: process.env.BASE_URL || `localhost:${process.env.PORT}`,
    }
  }
})
