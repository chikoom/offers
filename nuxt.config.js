export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Offers',
    mode: 'universal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Simple Offer board'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Lobster&family=M+PLUS+Rounded+1c:wght@300;400;700;900&display=swap'
      }
    ]
  },

  loading: {
    color: '#ff7100'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-socket-io'
  ],

  io: {
    server: [{ ioSvc: '/server/io/' }],
    sockets: [
      {
        // At least one entry is required
        name: 'home',
        url: 'http://localhost:3000',
        default: true,
        vuex: {
          mutations: [
            {
              recieveViewers: 'saveViewers'
            }
          ],
          actions: [
            {
              updateViewers: 'updateViewers'
            },
            {
              removeViewers: 'removeViewers'
            }
          ]
        },
        namespaces: {
          /* see section below */
        }
      }
    ]
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 30000,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/token', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
          logout: { url: '/api/auth/logout', method: 'delete' }
        },
        autoLogout: true,
        tokenRequired: true,
        tokenType: 'bearer',
        // globalToken: true
        autoFetchUser: true
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],

  env: {},
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
