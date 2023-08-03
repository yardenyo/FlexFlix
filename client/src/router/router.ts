import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";
import Tr from "@/services/i18n/translation";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const locale = to.params.locale || Tr.guessDefaultLocale();

	if (!to.params.locale) {
		const pathWithLocale = `/${locale}${to.path}`;
		next({ ...to, path: pathWithLocale, params: { ...to.params, locale } });
		return;
	}

	next();
});

router.afterEach(() => {
	setTimeout(() => {
		window.scrollTo(0, 0);
	}, 100);
});

export default router;
