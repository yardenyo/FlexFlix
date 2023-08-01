import { defineStore } from "pinia";
import usersApi from "@/api/users.api";
import { ref, reactive, computed } from "vue";
import helpers from "@/helpers/app.helpers";
import { T_CreateUser } from "@/types/users.types";
import { S_State } from "@/types/system.types";

export const useUsersStore = defineStore("useUsersStore", () => {
	const state = reactive<S_State>({
		loading: false,
	});

	const createUserPayload = reactive<T_CreateUser>({
		username: "",
		email: "",
		password: "",
		role: "",
	});

	async function stateCreateUser() {
		state.loading = true;
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
				state.loading = false;
			});
	}

	async function stateGetAllUsers() {
		state.loading = true;
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
				state.loading = false;
			});
	}

	async function stateGetUserByID(id: string) {
		state.loading = true;
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
				state.loading = false;
			});
	}

	return {
		state,
		createUserPayload,
		stateCreateUser,
		stateGetAllUsers,
		stateGetUserByID,
	};
});
