export default defineNuxtConfig({
  devtools: { enabled: false },

  srcDir: './src/client',

  serverDir: './src/server',

  nitro: {
    output: { 
      dir: './dist/server', 
      serverDir: './dist/server/core', 
      publicDir: './dist/server/public' 
    }
  },

  runtimeConfig: {
    DEV: process.env.NODE_ENV === 'production' ? false : true,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_DB: process.env.MONGO_DB,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    public: {
      CLIENT_URL: process.env.CLIENT_URL,
      COOKIE_CONFIG: {
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      }
    }
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/ui',
    ['@nuxtjs/google-fonts', {
      display: 'swap',
      download: true,
      families: {
        Montserrat: [400,500,600,700]
      }
    }]
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: [
    '@/app.sass'
  ],

  colorMode: {
    preference: 'dark'
  },

  image: {
    domains: [
      process.env.DOMAIN as string
    ]
  }
})
