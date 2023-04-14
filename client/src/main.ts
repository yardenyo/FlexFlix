import App from "@/App.vue";
import Boot from "@/services/AppBoot";
import { createApp } from "vue";

// Styles
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "@/assets/scss/main.scss";

const app = createApp(App);

const system = new Boot(app);

system
	.boot()
	.then(({ config, generalSettings }: any) => {
		system.middleware(app);
		system.registerComponents(app);
		system.init(config, generalSettings);
		app.mount("#app");
	})
	.catch((err: any) => {
		console.error("CRITICAL ERROR: ", err);
	});
