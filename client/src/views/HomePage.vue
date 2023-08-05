<template>
	<div class="home-page" :dir="$i18n.locale === 'he' ? 'rtl' : 'ltr'">
		<div class="container">
			<div class="header">
				<div class="logo-section">
					<img class="logo" src="/src/assets/netflix-logo.svg" alt="flexflix logo" />
				</div>
				<div class="actions">
					<LanguageSwitcher />
					<Button :label="computedLabel" severity="danger" @click="computedAction" />
				</div>
			</div>
			<div class="content">
				<div class="main-div">
					<div class="title">{{ t("home.mainDiv.title") }}</div>
					<div class="description">{{ t("home.mainDiv.subtitle") }}</div>
					<div class="start-watching">{{ t("home.mainDiv.startWatching") }}</div>
					<div class="email-input-wrapper">
						<div class="email-input">
							<InputText v-model="state.email" :placeholder="$t('login.emailAddress')" />
							<small v-if="v$.email.$error" class="error-message">
								<i class="pi pi-times-circle"></i>
								{{ v$.email.$errors[0].$message }}
							</small>
						</div>
						<div class="get-started">
							<Button :label="t('home.mainDiv.getStarted')" severity="danger" @click="signUp" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";
import { useAppStore } from "@/store/app.store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { appConfig } = storeToRefs(appStore);
const { t } = useI18n();
const router = useRouter();

const state = reactive({
	email: "",
});

const rules = reactive({
	email: {
		required: helpers.withMessage(t("login.validEmail"), required),
		email: helpers.withMessage(t("login.validEmail"), email),
	},
});

const v$ = useVuelidate(rules, state);

const computedLabel = computed(() => {
	return !appConfig.value?.authenticated ? t("login.signIn") : t("login.signOut");
});

function signUp() {
	v$.value.$touch();
	if (v$.value.$invalid) return;
	router.push({ name: "Signup" });
}

function computedAction() {
	if (appConfig.value?.authenticated) {
		appStore.stateLogout().then(() => {
			window.location.href = "/";
		});
	} else {
		router.push({ name: "Login" });
	}
}
</script>

<style lang="scss" scoped>
[dir="rtl"] .error-message {
	position: absolute;
	bottom: -1.5rem;
	right: 0;
	color: $red;
	font-size: 1rem;
}

.home-page {
	height: 100vh;
	background: $homepage-full;
	overflow-y: auto;

	.container {
		height: 100%;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80px;
			padding: 0 3rem;
			.logo-section {
				height: 80px;
				.logo {
					width: 190px;
				}
			}
			.actions {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
		}
		.content {
			height: calc(100% - 80px);
			padding: 0 3rem;

			.main-div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				gap: 2rem;
				min-height: 55rem;
				background-image: $homepage-main-div;
				border-radius: 16px;
				padding: 5.875rem min(10%, 9.5rem) 9.1875rem;

				.title {
					font-size: 5.5rem;
					line-height: 6.25rem;
					width: 60%;
					font-weight: 700;
				}

				.description {
					font-size: 2rem;
					font-weight: 700;
				}

				.start-watching {
					font-size: 1.5rem;
					font-weight: 700;
				}

				.email-input-wrapper {
					display: flex;
					align-items: center;
					gap: 1rem;
					.email-input {
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 1rem;

						.error-message {
							position: absolute;
							bottom: -1.5rem;
							left: 0;
							color: $red;
							font-size: 1rem;
						}

						:deep(.p-inputtext) {
							border-radius: 4px;
							width: 25rem;
							height: 4rem;
							padding: 0 1rem;
							background: transparent;
							background-color: rgba(0, 0, 0, 0.5);
							border: 1px solid rgba(255, 255, 255, 0.5);
							font-size: 1.2rem;
							font-weight: 600;
							color: $white;
						}
					}

					.get-started {
						:deep(.p-button) {
							border-radius: 4px;
							width: 12rem;
							height: 4rem;
							padding: 0 1rem;
						}
					}
				}
			}
		}
	}
}
</style>
