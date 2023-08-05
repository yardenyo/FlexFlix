import { defineStore } from "pinia";
import { reactive } from "vue";
import helpers from "@/helpers/app.helpers";
import authApi from "@/api/auth.api";
import { S_AppConfig, S_State, S_Login } from "@/types/system.types";
import { useFormStateMachine } from "@/services/xState/authMachine";

export const useAppStore = defineStore("useAppStore", () => {
	const { current, send } = useFormStateMachine();
	const appState = reactive<S_State>({
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
		send({ type: "CHECK_AUTH" });
		appConfig.timezone = config.timezone;
		appConfig.timezone_datetime = config.timezone_datetime;
		appConfig.theme = config.theme;
		appConfig.routes = config.routes;
		appConfig.authenticated = config.authenticated;
		if (config.authenticated) {
			send({ type: "AUTHENTICATED" });
		} else {
			send({ type: "UNAUTHENTICATED" });
		}
	}

	async function stateLogin() {
		appState.loading = true;
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
				appState.loading = false;
			});
	}

	async function stateLogout() {
		appState.loading = true;
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
				appState.loading = false;
			});
	}

	return {
		current,
		appState,
		appConfig,
		loginPayload,
		appGeneralSettings,
		updateAppConfig,
		stateLogin,
		stateLogout,
	};
});
