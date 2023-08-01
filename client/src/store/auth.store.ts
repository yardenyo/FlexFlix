import { defineStore } from "pinia";
import authApi from "@/api/auth.api";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import { T_Login } from "@/types/auth.types";

export const useAuthStore = defineStore("useAuthStore", () => {
	const loading = ref<boolean>(false);
	const state = reactive<T_Login>({
		email: "",
		password: "",
		remember: false,
	});

	async function stateLogin() {
		loading.value = true;
		return await authApi
			.login(state)
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
				loading.value = false;
			});
	}

	return {
		loading,
		state,
		stateLogin,
	};
});
