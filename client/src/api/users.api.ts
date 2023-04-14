import api from "@/api/Api";

const users = "/users";

export default {
	createUser(payload: object) {
		return api.post(`${users}`, payload);
	},
	getAllUsers() {
		return api.get(`${users}`);
	},
	getUserById(id: string) {
		return api.get(`${users}/${id}`);
	},
	updateUser(id: string, payload: object) {
		return api.put(`${users}/${id}`, payload);
	},
	deleteUser(id: string) {
		return api.delete(`${users}/${id}`);
	},
};
