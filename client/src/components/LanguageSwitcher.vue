<template>
	<div>
		<Dropdown v-model="locale" option-label="name" option-value="id" :options="options" @change="switchLanguage" />
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import Tr from "@/services/i18n/translation";

const { t, locale } = useI18n();

const supportedLocales = Tr.supportedLocales;
const router = useRouter();

const options = computed(() => {
	return supportedLocales.map((sLocale: string) => {
		return {
			id: sLocale,
			name: t(`${sLocale}`),
		};
	});
});

async function switchLanguage(): Promise<void> {
	await Tr.switchLanguage(locale.value);
	try {
		await router.replace({ params: { locale: locale.value } });
		router.go(0);
	} catch (e) {
		console.log(e);
		router.push("/");
	}
}
</script>

<style lang="scss" scoped>
:deep(.p-dropdown) {
	width: 9rem;
	height: 2.5rem;
	border-radius: 0.5rem;
	border: 1px solid #e0e0e0;
	background-color: #000;

	.p-dropdown-label {
		color: #fff;
		font-size: 1.2rem;
	}

	&:hover,
	&:focus,
	&:active,
	&:focus-within {
		border: 1px solid #e0e0e0;
		box-shadow: none;
		outline: none;
	}
}
</style>
