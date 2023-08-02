import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";
import helpers from "@/helpers/app.helpers";
import Tr from "@/services/i18n/translation";
import { useAppStore } from "@/store/app.store";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const { appConfig } = useAppStore();
	const isAuthenticated = appConfig.authenticated;
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const requiresRedirect = to.matched.some((record) => record.meta.requiresRedirect);

	const locale = to.params.locale || Tr.guessDefaultLocale();

	if (!to.params.locale) {
		const pathWithLocale = `/${locale}${to.path}`;
		next({ ...to, path: pathWithLocale, params: { ...to.params, locale } });
		return;
	}

	if (requiresAuth && !isAuthenticated) {
		next({
			path: `/${locale}/login`,
		});
	} else if (requiresRedirect) {
		next({
			path: `/${locale}/`,
		});
	} else {
		next();
	}
});

router.afterEach(() => {
	setTimeout(() => {
		window.scrollTo(0, 0);
	}, 100);
});

export default router;
