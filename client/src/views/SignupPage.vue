<template>
	<div class="sign-up" :dir="$i18n.locale === 'he' ? 'rtl' : 'ltr'">1234</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/store/users.store";
import Helpers from "@/helpers/app.helpers";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useUsersStore();
const { state, createUserPayload } = storeToRefs(store);
const router = useRouter();
const { t } = useI18n();
</script>

<style scoped lang="scss">
.sign-up {
	background: url("/src/assets/netflix-bg.jpg");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	overflow-x: hidden;
}
</style>
