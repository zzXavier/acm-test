---
title: changelog
---

# fullstackopen.cn changelog

## [unreleased] - info

## [0.0.1] - start

### Set up starlight

Start from: [Astro starlight example tailwind](https://github.com/withastro/starlight/tree/main/examples/tailwind).

```
pnpm i
pnpm i rollup@4.18.0 (for Win7)
pnpm astro add sitemap
```

Set image service to noop, [ref](https://answers.netlify.com/t/problem-deploying-with-astro-4/109603/4)

```
image: {
     service: {
       entrypoint: 'astro/assets/services/noop'
    }
},
```

Update README.md. Update astro.config.mjs, add fullstackopen category and add files in src/content/docs/fullstackopen/

astro.config.mjs

```
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: 'https://fullstackopen.cn',
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
		title: 'Full stack open',
		expressiveCode: {
			styleOverrides: { borderRadius: '0.5rem' },
		},
		sidebar: [{
			label: 'Full stack open',
			autogenerate: {
				directory: 'fullstackopen'
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
	}), sitemap()],
	image: { service: passthroughImageService() },
	prefetch: {
		defaultStrategy: 'viewport'
	}
});
```

### vite-pwa/astro

ref: https://github.com/vite-pwa/astro/tree/main/examples/pwa-simple

package.json add dependencies:

```
  "dependencies": {
    "@astrojs/sitemap": "^3.1.6",
    "@astrojs/starlight": "^0.25.1",
    "@astrojs/starlight-tailwind": "^2.0.3",
    "@astrojs/tailwind": "^5.1.0",
    "astro": "^4.12.2",
    "rollup": "4.18.0",
    "sharp": "^0.32.5",
    "vite-plugin-pwa": ">=0.20.0 <1",
    "tailwindcss": "^3.4.4"
  },
  "devDependencies": {
    "@vite-pwa/astro": "^0.4.0",
    "workbox-window": "^7.1.0"
  }
```

```
pnpm i
```

tsconfig.json

```
{
  "extends": "astro/tsconfigs/base",
  "compilerOptions": {
    "types": [
      "astro/client",
      "vite-plugin-pwa/vanillajs",
      "vite-plugin-pwa/info"
    ]
  },
  "exclude": [
    "dist",
    "node_modules",
    "test"
  ]
}
```

add files in public:

```
favicon.ico
favicon.svg
pwa-192x192.png
pwa-512x512.png
robots.txt
```

src/env.d.ts, add:

```
/// <reference types="vite-plugin-pwa/info" />
/// <reference types="vite-plugin-pwa/vanillajs" />
```

add src/pwa.ts,

```
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    // eslint-disable-next-line no-console
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    // eslint-disable-next-line no-console
    console.log('PWA application ready to work offline')
  },
})
```

add src/vite-env.d.ts

```
declare const __DATE__: string
```

Generally we could set a src/layouts/Layout.astro, that set pwaInfo and add `__DATA__` into the page, but seems it is hard to modify starlight. After seaching we can add pwa info in ThemeProvider.astro and set replace in astro.config.mjs

ref: https://github.com/favna/nintendo-switch-eshop/blob/61d3c1001a95d01b82aff609c68b83eb46ce1984/documentation/astro.config.mts

src/components/starlight/ThemeProvider.astro

```
---
import type { Props } from "@astrojs/starlight/props";
import Icon from "@astrojs/starlight/components";
import { pwaInfo } from "virtual:pwa-info";

// replaced dynamically
const buildDate = __DATE__;
---

{pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} />}
<script>
    import { registerSW } from "virtual:pwa-register";

    registerSW({
        immediate: true,
        onRegisteredSW(swScriptUrl) {
            console.log("SW registered: ", swScriptUrl);
        },
        onOfflineReady() {
            console.log("PWA application ready to work offline");
        },
    });
</script>

{/* This is intentionally inlined to avoid FOUC. */}
<script is:inline>
    window.StarlightThemeProvider = (() => {
        const storedTheme =
            typeof localStorage !== "undefined" &&
            localStorage.getItem("starlight-theme");
        const theme =
            storedTheme ||
            (window.matchMedia("(prefers-color-scheme: light)").matches
                ? "light"
                : "dark");
        document.documentElement.dataset.theme =
            theme === "light" ? "light" : "dark";
        return {
            updatePickers(theme = storedTheme || "auto") {
                document
                    .querySelectorAll("starlight-theme-select")
                    .forEach((picker) => {
                        const select = picker.querySelector("select");
                        if (select) select.value = theme;
                        /** @type {HTMLTemplateElement | null} */
                        const tmpl = document.querySelector(`#theme-icons`);
                        const newIcon =
                            tmpl && tmpl.content.querySelector("." + theme);
                        if (newIcon) {
                            const oldIcon =
                                picker.querySelector("svg.label-icon");
                            if (oldIcon) {
                                oldIcon.replaceChildren(
                                    ...newIcon.cloneNode(true).childNodes,
                                );
                            }
                        }
                    });
            },
        };
    })();
</script>

<template id="theme-icons">
    <Icon name="sun" class="light" />
    <Icon name="moon" class="dark" />
    <Icon name="laptop" class="auto" />
</template>

<span style="display: hidden">Built at: {buildDate}</span>
```

astro.config.mjs

```
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: 'https://fullstackopen.cn',
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
		title: 'Full stack open',
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
			label: 'Full stack open',
			autogenerate: {
				directory: 'fullstackopen'
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
			name: 'fullstackopen.cn',
			short_name: 'fullstack',
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
```

The workbox will precache the files in dist(from the official doc) after deployed, but on pnpm dev, it will not precache all files, only the first page. Don't worry about this since the deploy is working.

zip all files in 0.0.1.zip and put in public.

### Deploy setup

Setup gitee, github, set double way sync.

Set domain ns to cloudflare, add pages from github.

```
git add . && git commit -m "start astro starlight" && git push
```
