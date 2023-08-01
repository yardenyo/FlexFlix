import { useMenuStore } from "@/store/menu.store";
import { useAppStore } from "@/store/app.store";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Sidebar from "primevue/sidebar";
import Password from "primevue/password";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Dialog from "primevue/dialog";
import Skeleton from "primevue/skeleton";
import Divider from "primevue/divider";
import router from "@/router/router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import resetStore from "@/services/ResetStore";
import helpers from "@/helpers/app.helpers";
import appApi from "@/api/app.api";
import i18n from "@/services/i18n/index";

const pinia = createPinia();
pinia.use(resetStore);

class Boot {
	app: any;
	appStore: any;
	menuStore: any;
	isAuthenticated: boolean;

	constructor(app: any) {
		this.app = app;
		this.appStore;
		this.menuStore;
		this.isAuthenticated = false;
	}

	/**
	 *
	 * @param {*} config
	 * @param {*} generalSettings
	 */

	async init(config: any, generalSettings: any) {
		try {
			this.appStore = useAppStore();
			this.menuStore = useMenuStore();

			this.appStore.updateAppConfig(config);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 *
	 * @returns void
	 */

	async boot(app: any) {
		return await this.loadAppConfig(app);
	}

	middleware(app: any) {
		app.use(router);
		app.use(pinia);
		app.use(PrimeVue, { ripple: true });
		app.use(i18n);
	}

	registerComponents(app: any) {
		app.component("Button", Button);
		app.component("InputText", InputText);
		app.component("InputNumber", InputNumber);
		app.component("InputSwitch", InputSwitch);
		app.component("Sidebar", Sidebar);
		app.component("Password", Password);
		app.component("Dropdown", Dropdown);
		app.component("MultiSelect", MultiSelect);
		app.component("Dialog", Dialog);
		app.component("Skeleton", Skeleton);
		app.component("Divider", Divider);
	}

	getLocale() {
		const urlPath = window.location.pathname;
		const urlPathArray = urlPath.split("/");
		const locale = urlPathArray[1];
		return locale;
	}

	/**
	 *
	 * @returns void
	 */

	async loadAppConfig(app: any) {
		const response = await appApi.fetchAppConfig();
		return await this.loadAppGeneralSettings(response.data.data);
	}

	/**
	 *
	 * @param {*} config
	 * @returns void
	 */
	async loadAppGeneralSettings(config: any) {
		return new Promise((resolve, reject) => {
			if (config.authenticated) {
				//? USER IS AUTHENTICATED
				const generalSettings = appApi.fetchAppGeneralSettings();
				this.isAuthenticated = true;
				resolve({ config, generalSettings });
			}
			resolve({ config });
		});
	}
}

export default Boot;
