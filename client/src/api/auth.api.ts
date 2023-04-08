import api from "@/api/Api";

const auth = "/auth";

export default {
	login(payload: object) {
		return api.post(`${auth}/login`, payload);
	},
	logout() {
		return api.post(`${auth}/logout`);
	},
};
