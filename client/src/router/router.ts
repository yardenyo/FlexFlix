import routes from "@/router/routes";
import { createRouter, createWebHistory } from "vue-router";
import helpers from "@/helpers/app.helpers";
import Tr from "@/services/i18n/translation";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

const loginPath = `/${Tr.guessDefaultLocale()}/login`;
const unguardedRoutes = [loginPath, "/en/login", "/he/login"];
router.beforeEach((to, from, next) => {
	const isAuthenticated = !helpers.isNil(localStorage.getItem("jwt-token"));
	if (isAuthenticated || unguardedRoutes.includes(to.path)) {
		next();
	} else {
		next(loginPath);
	}
});

router.afterEach(() => {
	setTimeout(() => {
		window.scrollTo(0, 0);
	}, 100);
});

export default router;
