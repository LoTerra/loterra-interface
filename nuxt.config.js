export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    routes: ['/terrand-oracle', '/public-sale', '/staking'],
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'LoTerra - Decentralized lottery on Terra blockchain',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `LoTerra is building a lottery gaming ecosystem thanks smart contracts on Terra blockchain.`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vuesax/dist/vuesax.css', 'boxicons/css/boxicons.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vuesax'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/color-mode',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  publicRuntimeConfig: {
    LOTERRA_LOTTERY_CONTRACT_ADDR:
      'terra16nc2sxj0rgdm0utpe8gw8dn0eef4va4y9txnyt',
    TERRAND_CONTRACT_ADDR: 'terra1q88h7ewu6h3am4mxxeqhu3srt7zw4z5s20qu3k',
    LOTA_CW20_CONTRACT_ADDR: 'terra14uz5zc4cykug48rrjfmjh9mlucr2p35dqx09yn',
    LCD_URL: 'https://tequila-lcd.terra.dev',
    LCD_CHAIN_ID: 'tequila-0004',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
