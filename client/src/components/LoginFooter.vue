<template>
	<div class="footer">
		<div class="container">
			<!-- <div class="title">Questions? Contact us.</div> -->
			<div class="title" @click="router.push({ name: 'contact-us' })">
				{{ t("loginFooter.contactUs") }}
			</div>
			<div class="links">
				<div v-for="link in links" :key="link.title" class="link">
					<router-link :to="link.link">{{ link.title }}</router-link>
				</div>
			</div>
			<LanguageSwitcher />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const locale = localStorage.getItem("user-locale");

const router = useRouter();
const { t } = useI18n();

const links = [
	{
		title: t("loginFooter.FAQ"),
		link: `/${locale}/faq`,
	},
	{
		title: t("loginFooter.helpCenter"),
		link: `/${locale}/help-center`,
	},
	{
		title: t("loginFooter.termsOfUse"),
		link: `/${locale}/terms-of-use`,
	},
	{
		title: t("loginFooter.privacyPolicy"),
		link: `/${locale}/privacy`,
	},
	{
		title: t("loginFooter.cookiePreferences"),
		link: `/${locale}/cookie-preferences`,
	},
	{
		title: t("loginFooter.corporateInformation"),
		link: `/${locale}/corporate-information`,
	},
];
</script>

<style lang="scss" scoped>
$footer-section-height: 262px;

.footer {
	display: flex;
	justify-content: center;
	margin-top: 90px;
	height: $footer-section-height;
	background: rgba(0, 0, 0, 0.75);
	color: $footer-color;

	.container {
		width: 55%;
		display: flex;
		flex-direction: column;
		height: calc(#{$footer-section-height} - 120px);
		padding: 40px 20px;

		.title {
			font-size: 16px;
			display: flex;
			align-items: center;
			padding-bottom: 20px;

			&:hover {
				cursor: pointer;
				text-decoration: underline;
			}
		}

		.links {
			display: flex;
			flex-wrap: wrap;
			height: calc(#{$footer-section-height} - 170px);
			padding-bottom: 20px;

			.link {
				width: 220px;
				height: 30px;
				display: flex;
				align-items: center;

				a {
					font-size: 12px;
					text-decoration: none;
					color: $footer-color;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
}

@media screen and (max-width: $mobile-screen) {
	.footer {
		border-top: 1px solid $footer-color;
		.container {
			width: 100%;
			padding: 20px 20px;

			.title {
				font-size: 14px;
			}

			.links {
				padding-bottom: 120px;

				.link {
					width: 50%;
					height: 30px;
					display: flex;
					align-items: center;

					a {
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>
