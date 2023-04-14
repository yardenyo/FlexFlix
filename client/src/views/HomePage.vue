<template>
	<div class="home-page">123</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/store/users.store";

const store = useUsersStore();
const { createUserPayload, loading } = storeToRefs(store);

onMounted(() => {});
</script>

<style lang="scss" scoped></style>
