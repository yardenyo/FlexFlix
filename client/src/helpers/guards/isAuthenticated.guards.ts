import { useAppStore } from "@/store/app.store";

function isAuthenticated(to: any, from: any, next: any) {
	const { appConfig } = useAppStore();
	const isAuthenticated = appConfig.authenticated;

	if (!isAuthenticated) {
		next({ name: "Login" });
	} else {
		next();
	}
}

export default isAuthenticated;
