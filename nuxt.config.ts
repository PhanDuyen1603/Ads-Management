// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src',
  imports: {
    dirs: [
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/**.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
    ]
  },
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
      link: [
        { rel: 'icon', type: 'image/jpg', href: '/favicon.jpg' },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        },
      ],
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
