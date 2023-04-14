<template>
	<div class="login-page view">
		<div class="logo-section">
			<img class="logo" src="/src/assets/netflix-logo.svg" alt="flexflix logo" />
		</div>
		<div class="content">
			<div class="login-container">
				<div class="form">
					<h1 class="title">Sign In</h1>
					<div class="inputtext-wrapper">
						<InputText v-model="state.email" placeholder="Email address" />
						<small v-if="v$.email.$error" class="error-message">
							{{ v$.email.$errors[0].$message }}
						</small>
						<Password v-model="state.password" placeholder="Password" :feedback="false" />
						<small v-if="v$.password.$error" class="error-message">
							{{ v$.password.$errors[0].$message }}
						</small>
					</div>
					<div class="signup">
						<Button label="Sign In" severity="danger" :loading="loading" @click="login" />
						<small v-if="invalidCredentials" class="invalid-credentials">Invalid credentials. Please try again</small>
						<div class="signup-wrapper">
							<div class="remember-section">
								<input type="checkbox" v-model="state.remember" />
								<span>Remember me</span>
							</div>
							<div class="signup-link">
								<span>Don't have an account?</span>
								<router-link to="/signup">Sign Up</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/store/login.store";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";
import Helpers from "@/helpers/app.helpers";
import { useRouter } from "vue-router";

const store = useLoginStore();
const { state, loading } = storeToRefs(store);
const router = useRouter();
const invalidCredentials = ref(false);

const rules = reactive({
	email: {
		required: helpers.withMessage("Please enter a valid email address.", required),
		email: helpers.withMessage("Please enter a valid email address.", email),
	},
	password: {
		required: helpers.withMessage("Your password must contain at least 8 characters with at least one lowercase letter, one uppercase letter, and one digit.", required),
		validPassword: helpers.withMessage(
			"Your password must contain at least 8 characters with at least one lowercase letter, one uppercase letter, and one digit.",
			(value: string) => Helpers.isValidLoginPassword(value),
		),
	},
});

const v$ = useVuelidate(rules, state);

async function login() {
	v$.value.$touch();
	if (v$.value.$invalid) return;
	await store
		.stateLogin()
		.then(() => {
			invalidCredentials.value = false;
			router.push("/");
		})
		.catch((err) => {
			invalidCredentials.value = true;
		});
}
</script>

<style lang="scss" scoped>
$logo-section-height: 100px;
.invalid-credentials {
	display: block;
	color: $error-message;
	font-size: $fontSize;
	font-weight: 600;
}
.login-page {
	background: url("/src/assets/netflix-bg.jpg");
	background-size: cover;
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: $background-linear;
	}

	.logo-section {
		height: $logo-section-height;
		.logo {
			position: absolute;
			left: 30px;
			width: 220px;
		}
	}
	.content {
		position: relative;
		height: calc(100% - #{$logo-section-height});

		.login-container {
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			background: $container-dark-bg;
			min-height: 600px;
			width: 450px;
			padding: 60px 68px 40px;
			border-radius: 5px;

			.form {
				.title {
					font-size: 32px;
					font-weight: 700;
				}
				.inputtext-wrapper {
					display: flex;
					flex-direction: column;
					gap: 15px;
					padding: 30px 0;
					:deep(.p-inputtext) {
						border-radius: 5px;
						font-size: 16px;
						padding: 10px 12px;
						height: 50px;
						width: 100%;
						background: $input-bg;
						color: $text;
						border: none;

						&:focus,
						&:hover {
							box-shadow: none;
							border: none;
							outline: none;
						}
					}

					:deep(.p-password) {
						width: 100%;
					}

					label {
						color: $text;
					}

					.error-message {
						display: block;
						color: $error-message;
						font-size: $fontSize;
						font-weight: 600;
					}
				}
				.signup {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					gap: 10px;

					:deep(.p-button) {
						width: 100%;
						height: 50px;
						border-radius: 5px;
						font-size: 16px;
						font-weight: 700;
						letter-spacing: 1px;
						cursor: pointer;
						transition: all 0.3s ease-in-out;
						&:hover {
							transform: scale(1.05);
						}
						&:focus,
						&:active {
							outline: none;
							border: none;
							box-shadow: none;
						}
					}
					.signup-wrapper {
						display: flex;
						justify-content: space-between;
						align-items: center;
						.remember-section {
							display: flex;
							align-items: center;
							gap: 5px;

							input[type="checkbox"] {
								width: 20px;
								height: 20px;
								cursor: pointer;
								border-radius: 50%;
								&:checked {
									accent-color: $red !important;
								}
							}
						}
						.signup-link {
							display: flex;
							align-items: center;
							gap: 5px;

							a {
								color: $text;
								text-decoration: none;
								&:hover {
									text-decoration: underline;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
