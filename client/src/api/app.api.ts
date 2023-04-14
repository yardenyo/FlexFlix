import api from "@/api/Api";

const app = "/app";

export default {
	fetchAppConfig() {
		return api.get(`${app}/config`);
	},
	fetchAppGeneralSettings() {
		return api.get(`${app}/fetchGeneralSettings`);
	},
};
