<template>
	<div class="home-page" :dir="$i18n.locale === 'he' ? 'rtl' : 'ltr'">
		<div class="container">
			<div class="welcome-section">
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
					<div class="title">{{ t("home.mainDiv.title") }}</div>
					<div class="description">{{ t("home.mainDiv.subtitle") }}</div>
					<div class="start-watching-wrapper">
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
			<HeroCards :cards="heroCards" />
		</div>
	</div>
</template>

<script setup lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useAppStore } from "@/store/app.store";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import HeroCards from "@/components/HeroCards.vue";

const appStore = useAppStore();
const { appConfig } = storeToRefs(appStore);
const { t } = useI18n();
const router = useRouter();

const heroCards = ref([
	{
		id: 1,
		title: t("home.heroCards.card1.title"),
		description: t("home.heroCards.card1.description"),
		image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
		video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
	},
	{
		id: 2,
		title: t("home.heroCards.card2.title"),
		description: t("home.heroCards.card2.description"),
		image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
	},
	{
		id: 3,
		title: t("home.heroCards.card3.title"),
		description: t("home.heroCards.card3.description"),
		image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png",
		video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v",
	},
	{
		id: 4,
		title: t("home.heroCards.card4.title"),
		description: t("home.heroCards.card4.description"),
		image: "https://occ-0-1855-768.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55",
	},
]);

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
$welcome-section-height: 56rem;
$header-height: 5.375rem;
$content-height: calc(#{$welcome-section-height} - #{$header-height});
[dir="rtl"] .error-message {
	position: absolute;
	bottom: -1.5rem;
	right: 0;
	color: $red;
	font-size: 1rem;
}

.home-page {
	height: 100vh;
	background: $background;
	overflow-y: auto;

	.container {
		height: 100%;

		.welcome-section {
			height: $welcome-section-height;
			border-bottom: 0.8rem solid $divider;
			background-image: $homepage-main-div;
			background-repeat: no-repeat;
			background-size: cover;

			.header {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: $header-height;
				padding: 3.5rem 28rem;
				.logo-section {
					display: flex;
					align-items: center;
					height: 80px;
					.logo {
						width: 220px;
					}
				}
				.actions {
					display: flex;
					align-items: center;
					gap: 2rem;

					:deep(.p-button) {
						height: 2.5rem;
					}
				}
			}

			.content {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: $content-height;
				gap: 1rem;

				& > div {
					padding: 1.5rem;
				}

				.title {
					font-size: 4rem;
					font-weight: 1000;
				}

				.description {
					font-size: 2rem;
				}

				.start-watching-wrapper {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 1.5rem;
					.start-watching {
						font-size: 1.5rem;
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
								width: 30rem;
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
								font-size: 1.5rem;
							}
						}
					}
				}
			}
		}
	}
}
</style>
