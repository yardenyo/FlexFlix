import { defineStore } from "pinia";
import usersApi from "@/api/users.api";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import { T_CreateUser } from "@/types/users.types";

export const useUsersStore = defineStore("useUsersStore", () => {
	const loading = ref<boolean>(false);
	const createUserPayload = reactive<T_CreateUser>({
		username: "",
		email: "",
		password: "",
		role: "",
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
