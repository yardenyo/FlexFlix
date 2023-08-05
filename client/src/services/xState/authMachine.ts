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
	/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgJYQBswBiAYQAkBRUgaQH0BBAVQBVyBtABgF1FQAHAPaxc6XIIB2fEAA9EAdgCcANmwqAHPICsigCycATMv3KANCACeiAIwBmW9mVPlW5Xd22tnDwF8f5tCxsAGNMMGCAa1wJKGJmNkoAORYASVIGFkoAES5eJBAhETFJaTkEdWtFbE5FW3lrawN69U5bdXMrBDqtbGtnXRaW2w8DXT8AjBxQ8KiY4iZE+KpktIzs3OlC0XEpfLKlVQ1tPUNjTjNLRDdVZzPT+x1xkECpsMjo2JSsgBlKDfytsVdqAyoprLpqvJBpwtH1lJp5B1EOoHHCnLprOoUVp5MpFE8XtgCIIoDAICkJMRvgB5ADi1NY-wEwm2JT2iFGqnkw086gMWl0o1quiRCAMMOqGKcox0uK0ngJkyJJLJFLIVFojFYHB4mxZQNKiC88mwBgq-Iq8kFdlsov5EKlLgM1k43N08MVQWJpMgaq+vyZBX1O0NCGNpvNWkt1vsdsMpt0iiTwz08O58k9OG9ZOpGCpdJSiUDgJD7LFruwOm6eN0OPUbhFlzFWh6Ar6Av0OKj1kzyp9EFz6HV1HoS2LwbZII5Far2hrdYbosTPTB6M79lsihbvezkEHxH9f11AInwNk05Ns9cegX4NFFWwiaTim0zrxLp7TwkgggcGkLz1IpSynBAAFoLk6cDe3wIhANZM8ymUeQDDUNNZS8RpznvKohSTQx9EqWp1F7aZ3hiOCDTLF0DCqNDXTcdRFCMAw7VcSstwMTiVHOWwDB3FVfTPEtJ3PLpuQjRooy0N9alsCCOTsRwhT5HFRifMZ-GeJVdwHDAKOA0TBVFFRH2fLFGKhYx1A0vwgA */
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
