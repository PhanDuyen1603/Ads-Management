// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3030
  },
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
  ],
  build: {
    transpile: ['@fawmi/vue-google-maps']
  },
  alias: {
    '@constant': './src/constant'
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/jpg', href: '/favicon.jpg' }],
      script: [{ src: 'bootstrap/js/bootstrap.bundle.min.js'}]
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/styles/reset.css',
    '~/styles/_app.scss',
  ],
  runtimeConfig: {
    public: {
      googleMapApiKey: process.env.GOOGLE_MAP_API_KEY || ''
    }
  }
})
