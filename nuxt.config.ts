// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxt/eslint'
  ],

  // Site URL
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://licornes.kupfer.cloud'
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'png']
  },

  // Shadcn-vue configuration
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://licornes.kupfer.cloud'
    }
  },

  // App config
  app: {
    head: {
      title: 'Royaume des Licornes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'Un monde magique pour Andrea et Suzanne' },
        { name: 'theme-color', content: '#FF69B4' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Quicksand:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  // TypeScript
  typescript: {
    strict: true
  }
})
