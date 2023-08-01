<template>
	<div class="login-page" :dir="$i18n.locale === 'he' ? 'rtl' : 'ltr'">
		<div class="logo-section" @click="router.push('/')">
			<img class="logo" src="/src/assets/netflix-logo.svg" alt="flexflix logo" />
		</div>
		<div class="content">
			<div class="login-container">
				<div class="form">
					<h1 class="title">{{ $t("login.signIn") }}</h1>
					<div>
						<form class="form-wrapper">
							<InputText v-model="loginPayload.email" :placeholder="$t('login.emailAddress')" />
							<small v-if="v$.email.$error" class="error-message">
								{{ v$.email.$errors[0].$message }}
							</small>
							<Password v-model="loginPayload.password" :placeholder="$t('login.Password')" :feedback="false" />
							<small v-if="v$.password.$error" class="error-message">
								{{ v$.password.$errors[0].$message }}
							</small>
						</form>
					</div>
					<div class="signup">
						<Button :label="$t('login.signIn')" severity="danger" :loading="state.loading" @click="login" />
						<small v-if="invalidCredentials" class="invalid-credentials">{{ $t("login.invalidCredentials") }}</small>
						<div class="signup-wrapper">
							<div class="remember-section">
								<input type="checkbox" v-model="loginPayload.remember" />
								<span>{{ $t("login.rememberMe") }}</span>
							</div>
							<div class="signup-link">
								<span>{{ $t("login.dontHaveAccount") }}</span>
								<router-link to="/">{{ $t("login.signUp") }}</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<LoginFooter />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app.store";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";
import Helpers from "@/helpers/app.helpers";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import LoginFooter from "@/components/LoginFooter.vue";

const store = useAppStore();
const { state, loginPayload } = storeToRefs(store);
const router = useRouter();
const invalidCredentials = ref(false);
const { t } = useI18n();

const rules = reactive({
	email: {
		required: helpers.withMessage(t("login.validEmail"), required),
		email: helpers.withMessage(t("login.validEmail"), email),
	},
	password: {
		required: helpers.withMessage(t("login.validPassword"), required),
		validPassword: helpers.withMessage(t("login.validPassword"), (value: string) => Helpers.isValidLoginPassword(value)),
	},
});

const v$ = useVuelidate(rules, loginPayload);

async function login() {
	v$.value.$touch();
	if (v$.value.$invalid) return;
	await store
		.stateLogin()
		.then(() => {
			invalidCredentials.value = false;
			router.push("/");
		})
		.catch(() => {
			invalidCredentials.value = true;
		});
}

onBeforeUnmount(() => {
	invalidCredentials.value = false;
	store.$reset();
});
</script>

<style lang="scss" scoped>
$logo-section-height: 100px;
$footer-section-height: 262px;

.logo-section {
	height: $logo-section-height;
	.logo {
		position: absolute;
		left: 30px;
		width: 220px;
	}
}

/* For RTL */
[dir="rtl"] .login-page {
	direction: rtl;
}

[dir="rtl"] .logo-section {
	height: $logo-section-height;
	.logo {
		position: absolute;
		right: 30px;
		width: 220px;
	}
}

.form {
	text-align: left;
}

[dir="rtl"] .form {
	text-align: right;
}

.login-page {
	background: url("/src/assets/netflix-bg.jpg");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	overflow-x: hidden;

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
		cursor: pointer;
	}
	.content {
		position: relative;
		height: calc(100% - #{$logo-section-height} - #{$footer-section-height});

		.login-container {
			margin: 0 auto;
			background: $container-dark-bg;
			height: 660px;
			width: 450px;
			padding: 60px 68px 40px;
			border-radius: 5px;

			.form {
				.title {
					font-size: 32px;
					font-weight: 700;
				}
				.form-wrapper {
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
					.invalid-credentials {
						display: block;
						color: $error-message;
						font-size: $fontSize;
						font-weight: 600;
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

@media screen and (max-width: $mobile-screen) {
	.login-page {
		background: $background;
		.content {
			.login-container {
				width: 100%;
				height: 100%;
				padding: 60px 20px 40px;
			}
		}
		.logo-section {
			height: 60px;
			.logo {
				position: absolute;
				width: 150px;
			}
		}
	}
}
</style>
