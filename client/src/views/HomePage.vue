<template>
	<div class="home-page">
		<header class="app-header">
			<div class="card-header">
				<span :class="{ 'logo-wrapper--rtl': $i18n.locale === 'he', 'logo-wrapper--ltr': $i18n.locale === 'en' }">
					<span>
						<img class="logo" src="/src/assets/netflix-logo.svg" alt="flexflix logo" />
					</span>
				</span>
				<span class="langauge-switcher">
					<LanguageSwitcher />
				</span>
				<span class="action">
					<Button :label="computedLabel" severity="danger" @click="computedAction" />
				</span>
			</div>
		</header>
		<HeroCards :cards="heroCards" />
	</div>
</template>

<script setup lang="ts">
import HeroCards from "@/components/HeroCards.vue";
import { ref, computed } from "vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useAppStore } from "@/store/app.store";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const { appConfig } = storeToRefs(appStore);
const { t } = useI18n();
const router = useRouter();

const heroCards = ref([
	{
		id: 1,
		name: "mainDiv",
	},
	{
		id: 2,
		name: "watchOnTv",
		image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png",
		video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
	},
	{
		id: 3,
		name: "downloadAndWatch",
		image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
	},
	{
		id: 4,
		name: "watchOnDevice",
		image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png",
		video: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v",
	},
	{
		id: 5,
		name: "kidsValueProp",
		image: "https://occ-0-1855-768.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55",
	},
	{
		id: 6,
		name: "faq",
	},
]);

const computedLabel = computed(() => {
	return !appConfig.value?.authenticated ? t("login.signIn") : t("login.signOut");
});

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
.home-page {
	height: 100vh;
	background: $background;
	overflow-y: auto;

	.app-header {
		position: relative;
		z-index: 1;

		.card-header {
			margin: auto;
			max-width: calc(100% - 3rem);
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-align-items: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-pack: end;
			-ms-flex-pack: end;
			-webkit-justify-content: flex-end;
			justify-content: flex-end;
			position: absolute;
			left: 0;
			right: 0;

			.logo-wrapper--ltr {
				margin: 0 0.25rem;
				margin-right: auto;

				&:first-of-type {
					margin-left: 0;
				}

				.logo {
					width: 11rem;
					height: 4.5rem;
				}
			}

			.logo-wrapper--rtl {
				margin: 0 0.25rem;
				margin-left: auto;

				&:first-of-type {
					margin-right: 0;
				}

				.logo {
					width: 11rem;
					height: 4.5rem;
				}
			}

			.langauge-switcher {
				margin: 0 0.25rem;
			}

			.action {
				margin: 0 0.25rem;
			}
		}
	}
}

@media screen and (min-width: $mobile-screen) {
	.home-page {
		.app-header {
			.card-header {
				max-width: calc(100% - 4rem);
			}
		}
	}
}

@media screen and (min-width: $small-tablet-screen) {
	.home-page {
		.app-header {
			.card-header {
				max-width: calc(100% - 4rem);
				height: 5.375rem;

				.logo-wrapper--ltr {
					margin: 0 0.75rem;
					margin-right: auto;
				}

				.logo-wrapper--rtl {
					margin: 0 0.75rem;
					margin-left: auto;
				}

				.langauge-switcher {
					margin: 0 0.75rem;
				}

				.action {
					margin: 0 0.75rem;
				}
			}
		}
	}
}

@media screen and (min-width: $tablet-screen) {
	.home-page {
		.app-header {
			.card-header {
				max-width: calc(83.33333333333334% - 6rem);
			}
		}
	}
}

@media screen and (min-width: $desktop-screen) {
	.home-page {
		.app-header {
			.card-header {
				max-width: calc(66.66666666666666% - 6rem);
			}
		}
	}
}
</style>
