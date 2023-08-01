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

	const loginPayload = reactive<T_Login>({
		email: "",
		password: "",
		remember: false,
	});

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

	return {
		state,
		loginPayload,
		stateLogin,
	};
});
