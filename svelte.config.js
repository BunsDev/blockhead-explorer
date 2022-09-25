import adapter from '@sveltejs/adapter-auto'
// import adapterStatic from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// adapter: adapterStatic({
		// 	// default options are shown
		// 	pages: 'build',
		// 	assets: 'build',
		// 	fallback: null
		// }},

		alias: {
			$houdini: './$houdini',
		}
	}
};

export default config;
