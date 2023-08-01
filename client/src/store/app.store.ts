import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import appApi from "@/api/app.api";
import { S_AppConfig } from "@/types/system.types";

export const useAppStore = defineStore("useAppStore", () => {
	const loading = ref<boolean>(false);
	const appConfig = reactive<S_AppConfig>({
		timezone: "",
		timezone_datetime: "",
		theme: "",
		routes: [],
		authenticated: false,
	});

	const appGeneralSettings = reactive<object>({});

	async function updateAppConfig(config: S_AppConfig) {
		appConfig.timezone = config.timezone;
		appConfig.timezone_datetime = config.timezone_datetime;
		appConfig.theme = config.theme;
		appConfig.routes = config.routes;
		appConfig.authenticated = config.authenticated;
	}

	async function loadAppConfig() {}
	return {
		loading,
		appConfig,
		appGeneralSettings,
		loadAppConfig,
		updateAppConfig,
	};
});
