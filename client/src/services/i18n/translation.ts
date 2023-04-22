import i18n from "@/services/i18n/index";
import { nextTick } from "vue";

const Trans = {
	get supportedLocales() {
		return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
	},
	get defaultLocale() {
		return import.meta.env.VITE_DEFAULT_LOCALE;
	},
	set currentLocale(newLocale: string) {
		if (this.supportedLocales.includes(newLocale)) {
			i18n.global.locale.value = newLocale;
		} else {
			console.warn(`Locale "${newLocale}" is not supported`);
		}
	},
	isLocaleSupported(locale: string) {
		return this.supportedLocales.includes(locale);
	},
	getUserLocale(): { locale: string; localeNoRegion: string } {
		const locale = window.navigator.language || Trans.defaultLocale;
		return {
			locale,
			localeNoRegion: locale.split("-")[0],
		};
	},
	getPersistedLocale(): string | null {
		const persistedLocale = localStorage.getItem("user-locale");
		if (persistedLocale && Trans.isLocaleSupported(persistedLocale)) {
			return persistedLocale;
		} else {
			return null;
		}
	},
	guessDefaultLocale(): string {
		const userPersistedLocale = Trans.getPersistedLocale();
		if (userPersistedLocale) {
			return userPersistedLocale;
		}
		const userPreferredLocale = Trans.getUserLocale();
		if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
			return userPreferredLocale.locale;
		}
		if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
			return userPreferredLocale.localeNoRegion;
		}

		return Trans.defaultLocale;
	},
	async switchLanguage(newLocale: string) {
		Trans.currentLocale = newLocale;
		document.querySelector("html")?.setAttribute("lang", newLocale);
		localStorage.setItem("user-locale", newLocale);
	},
	async routeMiddleware(to: any, _from: any, next: any) {
		const paramLocale = to.params.locale;
		if (!Trans.isLocaleSupported(paramLocale)) {
			return next(Trans.guessDefaultLocale());
		}
		await Trans.switchLanguage(paramLocale);
		return next();
	},
	i18nRoute(to: any) {
		return {
			...to,
			params: {
				locale: Trans.currentLocale,
				...to.params,
			},
		};
	},
};

export default Trans;
