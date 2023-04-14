import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import appApi from "@/api/app.api";

export const useAppStore = defineStore("useAppStore", () => {
	const loading = ref<boolean>(false);
	const appConfig = reactive<object>({
		user: {},
		timezone: "",
		locale: "",
		theme: "",
	});

	const appGeneralSettings = reactive<object>({});

	async function loadAppConfig() {}
	return {
		loading,
		appConfig,
		appGeneralSettings,
		loadAppConfig,
	};
});
