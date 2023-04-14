import { defineStore } from "pinia";
import usersApi from "@/api/users.api";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";

type CreateUser = {
	email: string;
	password: string;
};
export const useUsersStore = defineStore("useUsersStore", () => {
	const loading = ref<boolean>(false);
	const createUserPayload = reactive<CreateUser>({
		email: "",
		password: "",
	});

	async function stateCreateUser() {
		loading.value = true;
		return await usersApi
			.createUser(createUserPayload)
			.then((res) => {
				helpers.status(res);
				return res;
			})
			.catch((err) => {
				throw err;
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function stateGetAllUsers() {
		loading.value = true;
		return await usersApi
			.getAllUsers()
			.then((res) => {
				helpers.status(res);
				return res;
			})
			.catch((err) => {
				throw err;
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function stateGetUserByID(id: string) {
		loading.value = true;
		return await usersApi
			.getUserById(id)
			.then((res) => {
				helpers.status(res);
				console.log(res);
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
		createUserPayload,
		stateCreateUser,
		stateGetAllUsers,
		stateGetUserByID,
	};
});
