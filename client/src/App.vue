<template>
	<RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import authApi from "@/api/auth.api";

onMounted(async () => {
	await authApi.login({
		email: "test3@gmail.com",
		password: "12345",
	});
});
</script>

<style scoped></style>
