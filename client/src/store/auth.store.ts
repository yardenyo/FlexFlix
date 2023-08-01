import { defineStore } from "pinia";
import authApi from "@/api/auth.api";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import { T_Login } from "@/types/auth.types";
import { S_State } from "@/types/system.types";

export const useAuthStore = defineStore("useAuthStore", () => {
	const state = reactive<S_State>({
		loading: false,
	});

	const loginParams = reactive<T_Login>({
		email: "",
		password: "",
		remember: false,
	});

	async function stateLogin() {
		state.loading = true;
		return await authApi
			.login(loginParams)
			.then((res) => {
				helpers.status(res);
				localStorage.setItem("jwt-token", res.data.token.token);
				const now = new Date();
				const expirationTime = new Date(now.getTime() + res.data.token.maxAge);
				localStorage.setItem("expirationTime", expirationTime.toISOString());
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
		loginParams,
		stateLogin,
	};
});
