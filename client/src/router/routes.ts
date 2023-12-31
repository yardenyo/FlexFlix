import { RouterView } from "vue-router";
import Tr from "@/services/i18n/translation";
import isAuthenticated from "@/helpers/guards/isAuthenticated.guards";

const routes = [
	{
		path: "/",
		redirect: `/${Tr.guessDefaultLocale()}`,
	},
	{
		path: "/:locale?",
		component: RouterView,
		beforeEnter: Tr.routeMiddleware,
		children: [
			{
				path: ":pathMatch(.*)*",
				name: "catchAll",
				component: () => import("@/views/404Page.vue"),
			},
			{
				path: "",
				name: "Home",
				component: () => import("@/views/HomePage.vue"),
			},
			{
				path: "login",
				name: "Login",
				component: () => import("@/views/LoginPage.vue"),
			},
			{
				path: "signup",
				name: "Signup",
				component: () => import("@/views/SignupPage.vue"),
			},
			{
				path: "dashboard",
				name: "Dashboard",
				component: () => import("@/views/DashboardPage.vue"),
				beforeEnter: [isAuthenticated],
			},
		],
	},
];

export default routes;
