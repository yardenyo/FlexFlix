import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import appApi from "@/api/app.api";
import authApi from "@/api/auth.api";
import { S_AppConfig, S_State, S_Login } from "@/types/system.types";

export const useAppStore = defineStore("useAppStore", () => {
	const state = reactive<S_State>({
		loading: false,
	});

	const appConfig = reactive<S_AppConfig>({
		timezone: "",
		timezone_datetime: "",
		theme: "",
		routes: [],
		authenticated: false,
	});

	const loginPayload = reactive<S_Login>({
		email: "",
		password: "",
		remember: false,
	});

	const appGeneralSettings = reactive<object>({});

	async function updateAppConfig(config: S_AppConfig) {
		appConfig.timezone = config.timezone;
		appConfig.timezone_datetime = config.timezone_datetime;
		appConfig.theme = config.theme;
		appConfig.routes = config.routes;
		appConfig.authenticated = config.authenticated;
	}

	async function stateLogin() {
		state.loading = true;
		return await authApi
			.login(loginPayload)
			.then((res) => {
				helpers.status(res);
				return res;
			})
			.catch((err) => {
				throw err;
			})
			.finally(() => {
				state.loading = false;
			});
	}

	async function stateLogout() {
		state.loading = true;
		return await authApi
			.logout()
			.then((res) => {
				helpers.status(res);
				return res;
			})
			.catch((err) => {
				throw err;
			})
			.finally(() => {
				state.loading = false;
			});
	}

	return {
		state,
		appConfig,
		loginPayload,
		appGeneralSettings,
		updateAppConfig,
		stateLogin,
		stateLogout,
	};
});
