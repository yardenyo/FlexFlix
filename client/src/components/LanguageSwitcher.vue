<template>
	<div>
		<Dropdown v-model="locale" option-label="name" option-value="id" :options="options" @change="switchLanguage">
			<template #value="slotProps">
				<img v-if="mobileScreen" :src="`/src/assets/globus.svg`" alt="language" class="wrapper" />
				<span v-else>
					<div class="wrapper">
						<img :src="`/src/assets/globus.svg`" alt="language" />
						{{ $t(`${slotProps.value}`) }}
					</div>
				</span>
			</template>
		</Dropdown>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import Tr from "@/services/i18n/translation";

const { t, locale } = useI18n();

const supportedLocales = Tr.supportedLocales;
const router = useRouter();

const windowWidth = ref(window.innerWidth);

const options = computed(() => {
	return supportedLocales.map((sLocale: string) => {
		return {
			id: sLocale,
			name: t(`${sLocale}`),
		};
	});
});

const mobileScreen = computed(() => {
	return windowWidth.value < 600;
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

onMounted(() => {
	window.addEventListener("resize", () => {
		windowWidth.value = window.innerWidth;
	});
});
</script>

<style lang="scss" scoped>
:deep(.p-dropdown) {
	background-color: #000;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.p-dropdown-trigger {
		width: 2rem;
	}
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
