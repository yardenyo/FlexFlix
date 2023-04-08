import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

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
	plugins: [vue(), vueJsx()],
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
				// additionalData: `@use  "sass:math"; @import "./src/assets/scss/v2/legacy.scss"; @import "./src/assets/scss/common.scss";`,
			},
		},
	},
});
