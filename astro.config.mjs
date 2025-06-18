import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import rehypePrettyCode from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import { SITE } from './src/config.ts'
import { remarkReadingTime } from './src/support/plugins.ts'
import { uploadAssetsToS3 } from './src/support/uploader.ts'
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

import decapCmsOauth from "astro-decap-cms-oauth";

// import path from 'node:path';
// import url from 'node:url'

// const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

// const alias = {
//     '@src': path.resolve(__dirname, './src'),
//     "@components": path.resolve(__dirname, './src/components'),
//     '@content': path.resolve(__dirname, './src/content'),
//     '@layouts': path.resolve(__dirname, './src/layouts'),
//     '@scripts': path.resolve(__dirname, './src/assets/scripts/'),
//     '@styles': path.resolve(__dirname, './src/assets/styles'),
//     "@pages": path.resolve(__dirname, './src/pages'),
//     '@support': path.resolve(__dirname, './src/support'),
//     '@images': path.resolve(__dirname, './src/images'),
//     'react-dom/server': 'react-dom/server.edge',
//   }

// resolve: {
//   alias
// },

export default defineConfig({
  
  vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
    plugins: [
      tailwindcss({
          content: [
              './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
              './node_modules/preline/preline.js',
          ],
          darkMode: 'class',
          theme: {
              colors: {
                  transparent: 'transparent',
                  current: 'currentColor',
                  black: '#000000',
                  white: '#ffffff',
                  gray: {
                      100: '#f3f4f6',
                      300: '#d1d5db',
                      500: '#6b7280',
                      600: '#4b5563',
                      800: '#1f2937',
                  },
                  indigo: {
                      200: '#c7d2fe',
                      300: '#a5b4fc',
                  },
                  neutral: {
                      50: '#fafafa',
                      100: '#f5f5f5',
                      200: '#e5e5e5',
                      300: '#d4d4d4',
                      350: '#bfbfbf',
                      400: '#a3a3a3',
                      500: '#737373',
                      600: '#525252',
                      700: '#404040',
                      800: '#262626',
                      900: '#171717',
                  },
                  yellow: {
                      50: '#fefce8',
                      100: '#fef9c3',
                      400: '#facc15',
                      500: '#eab308',
                  },
                  orange: {
                      100: '#ffedd5',
                      200: '#fed7aa',
                      300: '#fb713b',
                      400: '#fa5a15',
                      500: '#e14d0b',
                      600: '#ea580c',
                  },
                  red: {
                      400: '#f87171',
                      500: '#ef4444',
                  },
                  zinc: {
                      200: '#e4e4e7',
                      400: '#a1a1aa',
                      500: '#71717a',
                      600: '#52525b',
                      700: '#3f3f46',
                      800: '#27272a',
                      900: '#18181b',
                  },
              },
              extend: {
                  typography: ({ theme }) => ({
                      blog: {
                          css: {
                              '--tw-prose-body': theme('colors.neutral[700]'),
                              '--tw-prose-headings': theme('colors.neutral[900]'),
                              '--tw-prose-lead': theme('colors.neutral[700]'),
                              '--tw-prose-links': theme('colors.orange[300]'),
                              '--tw-prose-bold': theme('colors.neutral[900]'),
                              '--tw-prose-counters': theme('colors.neutral[600]'),
                              '--tw-prose-bullets': theme('colors.neutral[400]'),
                              '--tw-prose-hr': theme('colors.neutral[300]'),
                              '--tw-prose-quotes': theme('colors.neutral[500]'),
                              '--tw-prose-quote-borders': theme('colors.neutral[300]'),
                              '--tw-prose-captions': theme('colors.neutral[700]'),
                              '--tw-prose-code': theme('colors.neutral[700]'),
                              '--tw-prose-pre-code': theme('colors.neutral[900]'),
                              '--tw-prose-pre-bg': theme('colors.white'),
                              '--tw-prose-th-borders': theme('colors.neutral[300]'),
                              '--tw-prose-td-borders': theme('colors.neutral[200]'),
      
                              '--tw-prose-invert-body': theme('colors.neutral[400]'),
                              '--tw-prose-invert-headings': theme('colors.neutral[200]'),
                              '--tw-prose-invert-lead': theme('colors.neutral[300]'),
                              '--tw-prose-invert-links': theme('colors.orange[300]'),
                              '--tw-prose-invert-bold': theme('colors.neutral[300]'),
                              '--tw-prose-invert-counters': theme('colors.neutral[400]'),
                              '--tw-prose-invert-bullets': theme('colors.neutral[600]'),
                              '--tw-prose-invert-hr': theme('colors.neutral[700]'),
                              '--tw-prose-invert-quotes': theme('colors.neutral[500]'),
                              '--tw-prose-invert-quote-borders': theme('colors.neutral[500]'),
                              '--tw-prose-invert-captions': theme('colors.neutral[400]'),
                              '--tw-prose-invert-code': theme('colors.neutral[350]'),
                              '--tw-prose-invert-pre-code': theme('colors.neutral[300]'),
                              '--tw-prose-invert-th-borders': theme('colors.neutral[600]'),
                              '--tw-prose-invert-td-borders': theme('colors.neutral[700]'),
                          },
                      },
                      DEFAULT: {
                          css: {
                              blockquote: {
                                  fontStyle: 'normal',
                                  quotes: 'none',
                              },
                          },
                      },
                  }),
              },
          },
      })
    ],
  },

  site: SITE.url,

  image: {
      // If you don't want to optimize images during the BUILD process please set the ASTRO_IMAGE_OPTIMIZE environment variable to false
      // Please note that the environment value here is `string` type on Cloudflare Pages,
      // So please delete the environment variable directly if you want to disable the image optimization service
      service: (!!import.meta.env.ASTRO_IMAGE_OPTIMIZE || !!process.env.ASTRO_IMAGE_OPTIMIZE) ? sharpImageService() : passthroughImageService(),
  },

  integrations: [
      decapCmsOauth({
        adminRoute: "/admin",
        oauthDisabled: false,
        oauthLoginRoute: "/api/auth",
        oauthCallbackRoute: "/api/callback",
      }),
      partytown(),
      sitemap(),
      
      react(),
      (await import('@playform/compress')).default({
          CSS: true,
          JavaScript: true,
          HTML: {
              'html-minifier-terser': {
                  collapseWhitespace: true,
                  minifyCSS: false, // enable this will cause the CopyButton not work
                  minifyJS: true,
              },
          },
          Image: false,
          SVG: true,
          Logger: 2,
      }),
      uploadAssetsToS3(),
      starlight({
        title: "ZZX Docs",
        defaultLocale: "root",
        // https://github.com/withastro/starlight/blob/main/packages/starlight/CHANGELOG.md
        // If no Astro and Starlight i18n configurations are provided, the built-in default locale is used in Starlight and a matching Astro i18n configuration is generated/used.
        // If only a Starlight i18n configuration is provided, an equivalent Astro i18n configuration is generated/used.
        // If only an Astro i18n configuration is provided, the Starlight i18n configuration is updated to match it.
        // If both an Astro and Starlight i18n configurations are provided, an error is thrown.
        locales: {
          root: {
            label: "English",
            lang: "en",
          },
          de: { label: "Deutsch", lang: "de" },
          es: { label: "Español", lang: "es" },
          fa: { label: "Persian", lang: "fa", dir: "rtl" },
          fr: { label: "Français", lang: "fr" },
          ja: { label: "日本語", lang: "ja" },
          "zh-cn": { label: "简体中文", lang: "zh-CN" },
        },
        // https://starlight.astro.build/guides/sidebar/
        sidebar: [
          {
            label: "zzx",
            autogenerate: { directory: "zzx" },
          },
        ],
        social: [
          { icon: "github", label: "GitHub", href: "https://github.com/zzXavier" },
        ],
        disable404Route: true,
        customCss: ["./src/assets/styles/starlight.css"],
        favicon: "/favicon.ico",
        components: {
          SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
          Head: "./src/components/ui/starlight/Head.astro",
          MobileMenuFooter: "./src/components/ui/starlight/MobileMenuFooter.astro",
          ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
        },
        head: [
          {
            tag: "meta",
            attrs: {
              property: "og:image",
              content: "https://screwfast.uk" + "/social.webp",
            },
          },
          {
            tag: "meta",
            attrs: {
              property: "twitter:image",
              content: "https://screwfast.uk" + "/social.webp",
            },
          },
        ],
      }),
      
      mdx(),
  ],

  markdown: {
      syntaxHighlight: false,
      rehypePlugins: [
          [rehypePrettyCode, {
              theme: {
                  light: 'github-light',
                  dark: 'github-dark-dimmed',
              },
              keepBackground: false,
              transformers: [
                  transformerCopyButton(
                      {
                          visibility: 'always',
                          feedbackDuration: 2500,
                      },
                  ),
              ],
          }],
      ],
      remarkPlugins: [remarkReadingTime],
  },

  devToolbar: {
      enabled: false,
  },

  prefetch: true,
  output: 'static',

  build: {
      // Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.
      // see https://docs.astro.build/en/reference/configuration-reference/#buildassets
      assets: 'assets',
      // see https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix
      assetsPrefix: (!!import.meta.env.S3_ENABLE || !!process.env.S3_ENABLE) ? 'https://images.godruoyi.com/gblog' : '',
  },

  adapter: cloudflare(),

  
})