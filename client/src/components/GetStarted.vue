<template>
	<div class="email-input-wrapper">
		<div class="email-input">
			<div class="input">
				<InputText ref="inputRef" v-model="state.email" :placeholder="$t('login.emailAddress')" />
				<div v-if="v$.email.$error" class="error-message">
					<i class="pi pi-exclamation-circle" style="color: red"></i>
					{{ v$.email.$errors[0].$message }}
				</div>
			</div>
		</div>
		<div class="get-started">
			<Button :label="$t(`getStarted`)" severity="danger" @click="signUp" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import Helpers from "@/helpers/app.helpers";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";

interface HTMLNewElement extends HTMLElement {
	$el: HTMLInputElement;
}

const router = useRouter();
const { t } = useI18n();

const inputRef: Ref<HTMLNewElement | null> = ref(null);

const state = reactive({
	email: "",
});

const rules = reactive({
	email: {
		required: helpers.withMessage(t("login.validEmail"), required),
		email: helpers.withMessage(t("login.validEmail"), email),
	},
});

const v$ = useVuelidate(rules, state);

function signUp() {
	v$.value.$touch();
	if (v$.value.$invalid) {
		if (inputRef.value) {
			inputRef.value.$el.focus();
		}
		return;
	}
	router.push({ name: "Signup" });
}
</script>

<style scoped lang="scss">
.email-input-wrapper {
	text-align: left;
	position: relative;
	margin: 1rem auto 0;
	width: 100%;
	max-width: 36.625rem;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-align-items: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;

	.email-input {
		width: 100%;
		position: relative;
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-webkit-box-flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		vertical-align: text-top;

		.input {
			fill: currentColor;
			font-size: 1rem;
			font-weight: 400;
			min-width: 12.5rem;
			padding: 0;
			width: 100%;
			color: $white;
			.error-message {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				fill: currentcolor;
				font-size: 1rem;
				margin-top: 0.25rem;
				width: 100%;
				color: $red;

				img {
					width: 1rem;
					height: 1rem;
				}
			}
			:deep(.p-inputtext) {
				width: 100%;
				height: 3.5rem;
				padding: 0 1rem;
				background: transparent;
				background-color: rgba(0, 0, 0, 0.5);
				border: 0.0625rem solid rgba(255, 255, 255, 0.5);
				font-size: 1.2rem;
				font-weight: 600;
				color: $white;
			}
		}
	}

	.get-started {
		margin: 1rem 0 0;
		:deep(.p-button) {
			width: 100%;
			height: 3.5rem;
			padding: 0 1rem;
			font-size: 1.5rem;
		}
	}
}

@media screen and (min-width: $mobile-screen) {
	.email-input-wrapper {
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-align-items: flex-start;
		-webkit-box-align: flex-start;
		-ms-flex-align: flex-start;
		align-items: flex-start;
		.email-input {
			width: auto;
			-webkit-flex: 1 1 auto;
			-ms-flex: 1 1 auto;
			flex: 1 1 auto;
		}

		.get-started {
			-webkit-flex: 0 0 auto;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			margin-top: 0;
			[dir="rtl"] & {
				margin-right: 1rem;
			}
			[dir="ltr"] & {
				margin-left: 1rem;
			}
		}
	}
}
</style>
