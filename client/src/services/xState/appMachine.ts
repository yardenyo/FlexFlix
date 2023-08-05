import { createMachine, interpret } from "xstate";
import { ref } from "vue";

type StateSchema = {
	states: {
		idle: {};
		checking: {};
		loggedIn: {};
		loggedOut: {};
	};
};

type FormEvent = { type: "LOGIN" } | { type: "LOGOUT" } | { type: "CHECK_AUTH" } | { type: "AUTHENTICATED" } | { type: "UNAUTHENTICATED" } | { type: "IDLE" };

const authMachine = createMachine<StateSchema, FormEvent>({
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgJYQBswBiAYQAkBRUgaQH0BBAVQBVyBtABgF1FQAHAPaxc6XIIB2fEAA9EAdgCcANmwqAHOoBMARnnLlAFh0BmdQBoQAT0SmT2AwcOGArIpdbFOnQF8fltCxsAGNMMGCAa1wJKGJmNkoAORYASVIGFkoAES5eJBAhETFJaTkEdR1FbE5FM04XTkNNdWUtSxsEE3kXbB1HY2dlWta-AIwcUPComOImRPiqZLSM7NzpQtFxKXyypVUNbT0nUwtrRGU+h0cdYxMdFxNG0ZBAibDI6NiUrIAZSjX8htittQGUvIZqvIKootOpFOpOI8dO1EOp7H1lG5FIYai5Bspnq9sARBFAYBAUhJiD8APIAcRprABAmEmxKO0QWkMqnkJmcnFaaJcLnkOlOHS09Wqxgu8lFWl0d0MhPGxNJ5MpZCotEYrA4PHWrOBpUQDXk2FhOk8fK0LjFihRCFtEJlIvqlRUNxVQRJZMgmu+f2ZBSNWxNCDNFoq1sMtvtjslWgthkU7geJhFdoV3pwvvJNIw1PpKUSwaBYY5Ts45rcXRxXiGpiaCeF2DxGNhiiUbmU8hzar9EAL6C11HoCzLofZoM51bbtXk9b6Xj54sQKZ6DZcva6fQFrn7ecgw+Igf+BsBU5BslnNYXS8bq8dFWwKdTFWrQyUzj8-hAEkECA4GkV5DSKCsZwQABaZRHRg-t8CIMC2WvMpeyTA4rWUTgcMaNdyiqLlU3kIjMXkHCXH7SYPhiZDjUrHROE8Bx1G6FRyPlWEW1UNw7RabCHj6Q91X9a9y2nG9Ol5KMsJwrwSJhBNTAcIjFGrVMtDMbdhMHYc6IgyTY0dFRX1TFQTAbPcRl-IA */
	id: "auth",
	initial: "idle",
	predictableActionArguments: true,
	states: {
		idle: {
			on: {
				CHECK_AUTH: "checking",
			},
		},
		checking: {
			on: {
				AUTHENTICATED: "loggedIn",
				UNAUTHENTICATED: "loggedOut",
				IDLE: "idle",
			},
		},
		loggedIn: {
			on: {
				LOGOUT: "loggedOut",
				CHECK_AUTH: "checking",
				IDLE: "idle",
			},
		},
		loggedOut: {
			on: {
				LOGIN: "loggedIn",
				CHECK_AUTH: "checking",
				IDLE: "idle",
			},
		},
	},
});

export const useFormStateMachine = function (): { current: { value: any }; send: (event: FormEvent) => void } {
	const current = ref(authMachine.initialState);
	const service = interpret(authMachine);
	service
		.onTransition((state) => {
			current.value = state;
		})
		.start();
	const send = (event: FormEvent) => {
		service.send(event);
	};
	return { current, send };
};
