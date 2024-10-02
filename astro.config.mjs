import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: 'https://051105.cn',
	vite: {
		logLevel: 'info',
		define: {
			__DATE__: `'${new Date().toISOString()}'`
		},
		server: {
			fs: {
				// Allow serving files from hoisted root node_modules
				allow: ['../..']
			}
		}
	},
	// image: {
	// 	service: {
	// 		entrypoint: 'astro/assets/services/noop'
	// 	}
	// },
	integrations: [starlight({
		title: 'ZZX',
		components: {
			ThemeProvider: './src/components/starlight/ThemeProvider.astro'
		},
		expressiveCode: {
			styleOverrides: { borderRadius: '0.5rem' },
		},
		head: [
			{
				tag: 'meta',
				attrs: {
					httpEquiv: 'Page-Enter',
					content: 'RevealTrans(Duration=2.0,Transition=2)'
				}
			},
			{
				tag: 'meta',
				attrs: {
					httpEquiv: 'Page-Exit',
					content: 'RevealTrans(Duration=3.0,Transition=12)'
				}
			},
		],
		sidebar: [{
			label: 'ZZX',
			autogenerate: {
				directory: 'zzx'
			}
		}, {
			label: 'Guides',
			collapsed: true,
			items: [
				// Each item here is one entry in the navigation menu.
				{
					label: 'Example Guide',
					slug: 'guides/example'
				}]
		}, {
			label: 'Reference',
			collapsed: true,
			autogenerate: {
				directory: 'reference'
			}
		}],
		customCss: ['./src/tailwind.css']
	}), tailwind({
		applyBaseStyles: false
	}), AstroPWA({
		mode: 'development',
		base: '/',
		scope: '/',
		includeAssets: ['favicon.svg'],
		registerType: 'autoUpdate',
		// globIgnores: ["**/_worker.js/**/*", "_worker.js"],
		manifest: {
			name: '051105.cn',
			short_name: '051105',
			theme_color: '#ffffff',
			icons: [{
				src: 'pwa-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			}, {
				src: 'pwa-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}, {
				src: 'pwa-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable'
			}]
		},
		workbox: {
			// navigateFallback: '/',
			globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
			navigateFallbackDenylist: [/^\/api/],
			// globIgnores: ["**/_worker.js/**/*", "_worker.js"],
			// sourcemap: true
		},
		devOptions: {
			enabled: true,
			// navigateFallbackAllowlist: [/^\//],
		},
		experimental: {
			directoryAndTrailingSlashHandler: true
		}
	}), sitemap()],
	image: { service: passthroughImageService() },
	prefetch: {
		defaultStrategy: 'viewport'
	}
});