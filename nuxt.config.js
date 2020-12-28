export default {
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
            rel: 'stylesheet',
            href: 'https://rsms.me/inter/inter.css'
        }
    ],
  },

  css: [],

  plugins: [
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/paginate.js' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' },
    { src: '~/plugins/vue-tinybox.js', mode: 'client' },
    { src: '~/plugins/vue-js-modal.js'},
  ],

  components: true,

  buildModules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
  ],

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://127.0.0.1:8000',
        // endpoints: {
          
        // },
        token: {
            property: 'access_token',
            maxAge: 60 * 60
        },
        refreshToken: {
            maxAge: 20160 * 60
        },
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
    //   callback: '/auth/login',
      home: '/'
    }
  },


//   proxy: {
//     '/laravel': {
//       target: 'https://laravel-auth.nuxtjs.app',
//       pathRewrite: { '^/laravel': '/' }
//     }
//   },

  axios: {
    baseURL: 'http://127.0.0.1:8000/api'
  },

  build: {},
}
