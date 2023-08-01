export type S_State = {
	loading: boolean;
};

export type S_AppConfig = {
	timezone: string;
	timezone_datetime: string;
	theme: string;
	routes: any[];
	authenticated: boolean;
};

export type S_Login = {
	email: string;
	password: string;
	remember: boolean;
};
