import { createI18n } from "vue-i18n";
import en from "@/services/i18n/locales/en.json";
import he from "@/services/i18n/locales/he.json";

export default createI18n({
	globalInjection: true,
	locale: import.meta.env.VITE_DEFAULT_LOCALE,
	fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
	legacy: false,
	messages: { en, he },
});
