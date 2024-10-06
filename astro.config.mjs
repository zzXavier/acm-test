import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
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
		sidebar: [
			{
				label: 'Guides',
				collapsed: true,
				autogenerate: {
					directory: 'guides'
				}
				}, 
				{
					label: 'ZZX',
					autogenerate: {
						directory: 'zzx'
					}
				} 
		],
		customCss: ['./src/tailwind.css']
	}), tailwind({
		applyBaseStyles: false
	}), sitemap()],
	image: { service: passthroughImageService() }
});