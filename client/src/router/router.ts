import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";
import helpers from "@/helpers/app.helpers";
import Tr from "@/services/i18n/translation";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = !helpers.isNil(localStorage.getItem("jwt-token"));
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const requiresRedirect = to.matched.some((record) => record.meta.requiresRedirect);

	if (requiresAuth && !isAuthenticated) {
		next({
			path: `/${Tr.guessDefaultLocale()}/login`,
			query: { redirect: to.fullPath },
		});
	} else if (requiresRedirect) {
		next({
			path: `/${Tr.guessDefaultLocale()}/redirected-page`, // Change this to your desired redirected page
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
