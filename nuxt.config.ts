// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        // 前台公开页面 - 不需要认证
        '/',
        '/news',
        '/news/**',
        '/contact',
        '/berry-medical-nuxt/',
        '/berry-medical-nuxt/news',
        '/berry-medical-nuxt/news/**',
        '/berry-medical-nuxt/contact'
      ]
    },
    types: '~/types/supabase-database'
  },

  runtimeConfig: {
    public: {
      cdnBaseUrl: process.env.NUXT_PUBLIC_CDN_BASE_URL || '',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }
  },

  app: {
    baseURL: '/berry-medical-nuxt/',
    head: {
      title: '贝瑞医疗 | 核医学场所建设一站式服务商',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '贝瑞医疗科技（郑州）有限公司，深耕核医学场所建设全产业链，提供选址、方案设计、辐射防护施工、环评卫评支持、设备供应及智慧运维。' },
        { name: 'keywords', content: '核医学,辐射防护,放射性药品,GMP,智慧管理系统,瑞核V1.0,131I治疗,Lu-177标记药物' },
        { name: 'author', content: '贝瑞医疗科技' },
        { property: 'og:title', content: '贝瑞医疗 | 核医学场所建设一站式服务商' },
        { property: 'og:description', content: '专注核医学场所建设，从选址规划、辐射防护施工到智慧管理系统，为全国顶级医疗机构提供全产业链闭环解决方案。' },
        { property: 'og:type', content: 'website' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: './favicon.svg' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },

  typescript: {
    strict: true
  },

  routeRules: {
    '/': { prerender: true },
    '/news': { prerender: true },
    '/news/**': { prerender: true },
    '/contact': { prerender: true }
  },

  nitro: {
    prerender: {
      failOnError: false,
      routes: ['/', '/news', '/news/1', '/news/2', '/news/3', '/contact']
    }
  }
})
