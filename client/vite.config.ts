import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		port: 3000,
	},
	test: {
		environment: "happy-dom",
		globals: true,
	},
	plugins: [
		vue(),
		vueJsx(),
		VueI18nPlugin({
			include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/i18n/locales/**"),
		}),
	],
	resolve: {
		extensions: [".js", ".json", ".vue", ".scss", ".css"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
			img: path.resolve(__dirname, "./public/img"),
		},
	},
	build: {
		sourcemap: false,
		minify: true,
		assetsDir: "chunks",
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "sass:math"; @import "@/assets/scss/variables.scss";`,
			},
		},
	},
});
