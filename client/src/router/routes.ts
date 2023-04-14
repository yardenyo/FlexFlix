const routes = [
	{
		path: "/:pathMatch(.*)*",
		name: "catchAll",
		component: () => import("@/views/404Page.vue"),
	},
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/HomePage.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/LoginPage.vue"),
	},
];

export default routes;
