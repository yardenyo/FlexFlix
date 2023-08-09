<template>
	<div class="hero-cards">
		<div :data-uia="`hero-card-${card.name}`" v-for="(card, index) in props.cards" :key="card.id">
			<div v-if="index === 0" class="hero-card main-div">
				<div class="main-div-wrapper">
					<div class="content-wrapper">
						<div class="content">
							<h1 class="title">{{ $t(`home.heroCards.${card.name}.title`) }}</h1>
							<p class="description">{{ $t(`home.heroCards.${card.name}.description`) }}</p>
							<div class="start-watching-wrapper">
								<div class="start-watching">
									<form class="form">
										<h3 class="sub-description">{{ $t(`home.heroCards.${card.name}.startWatching`) }}</h3>
										<GetStarted />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="divider"></div>
			</div>
			<div v-else-if="index !== 0 && index !== 5" class="hero-card sub-div">
				<div
					class="hero-card-wrapper"
					:class="{
						'image-on-left': card.image && index % 2 === 0,
						'image-on-right': card.image && index % 2 !== 0,
					}">
					<div class="hero-card-content-split">
						<h2 class="title">{{ $t(`home.heroCards.${card.name}.title`) }}</h2>
						<p class="description">{{ $t(`home.heroCards.${card.name}.description`) }}</p>
					</div>
					<div v-if="card.image || card.video" class="hero-card-media-wrapper">
						<img :src="card.image" :alt="card.name" />
						<div :class="['hero-card-video-wrapper', index === 1 ? 'first-video' : 'second-video']">
							<video :src="card.video" autoplay muted loop></video>
						</div>
					</div>
				</div>
				<div class="divider"></div>
			</div>
			<div v-else class="hero-card sub-div">
				<div class="hero-card-wrapper">
					<div class="hero-card-content">
						<h2 class="title">{{ $t(`home.heroCards.${card.name}.title`) }}</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, Ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { useAppStore } from "@/store/app.store";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import GetStarted from "@/components/GetStarted.vue";

const { t } = useI18n();
const appStore = useAppStore();
const { appConfig } = storeToRefs(appStore);
const router = useRouter();

const props = defineProps({
	cards: {
		type: Array as () => Array<{
			id: number;
			name: string;
			image?: string;
			video?: string;
			logo?: string;
		}>,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.hero-cards {
	.hero-card {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		color: $white;
		text-align: center;
		height: 100%;
		box-sizing: border-box;

		.hero-card-wrapper {
			margin: auto;
			max-width: calc(100% - 3rem);
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-align-items: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			text-align: center;

			&.image-on-left {
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
			}

			&.image-on-right {
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
			}

			.hero-card-content-split {
				-webkit-flex-basis: 50%;
				-ms-flex-preferred-size: 50%;
				flex-basis: 50%;
				padding: 0;
				z-index: 1;
				width: 100%;

				.title {
					margin: 0;
					font-size: 2rem;
					font-weight: 700;
				}

				.description {
					margin: 1rem 0 0;
					font-size: 1.125rem;
					font-weight: 400;
				}
			}

			.hero-card-content {
				-webkit-flex-basis: 100%;
				-ms-flex-preferred-size: 100%;
				flex-basis: 100%;
				padding: 0;
				z-index: 1;
				width: 100%;

				.title {
					margin: 0;
					font-size: 2rem;
					font-weight: 700;
				}

				.description {
					margin: 1rem 0 0;
					font-size: 1.125rem;
					font-weight: 400;
				}
			}

			.hero-card-media-wrapper {
				position: relative;
				-webkit-flex-basis: 50%;
				-ms-flex-preferred-size: 50%;
				flex-basis: 50%;
				padding: 0;
				z-index: 1;

				img {
					width: 100%;
				}

				.hero-card-video-wrapper {
					z-index: -1;
					overflow: hidden;
					width: 100%;
					height: 100%;
					position: absolute;
					-webkit-transform: translate(-50%, -50%);
					-moz-transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					transform: translate(-50%, -50%);

					&.first-video {
						top: 46%;
						left: 50%;
						max-width: 73%;
						max-height: 54%;
					}

					&.second-video {
						top: 34%;
						left: 50%;
						max-width: 63%;
						max-height: 47%;
					}

					video {
						display: inline-block;
						vertical-align: baseline;
					}
				}
			}
		}
	}

	.main-div {
		min-height: 40rem;
		padding: 7.5rem 0 2rem;
		background-image: url("/src/assets/netflix-bg.jpg");
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
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

		.main-div-wrapper {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.content-wrapper {
				margin: auto;
				max-width: calc(100% - 3rem);
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
				display: flex;
				-webkit-align-items: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				-webkit-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
				text-align: center;

				.content {
					-webkit-flex-basis: 50%;
					-ms-flex-preferred-size: 50%;
					flex-basis: 50%;
					padding: 0;
					z-index: 1;
					width: 100%;

					.title {
						margin: 0;
						font-size: 2rem;
						font-weight: 700;
					}

					.description {
						margin: 1rem 0 0;
						font-size: 1.125rem;
						font-weight: 400;
					}

					.start-watching-wrapper {
						margin: 1.5rem 0 0;

						.start-watching {
							text-align: center;
							box-sizing: border-box;
							max-width: 61.5rem;
							margin: 0 auto;
							padding: 0 1.5rem;
							content: "1";

							.form {
								display: -webkit-box;
								display: -webkit-flex;
								display: -ms-flexbox;
								display: flex;
								-webkit-flex-direction: column;
								-ms-flex-direction: column;
								flex-direction: column;

								.sub-description {
									margin: 0;
									font-size: 1.125rem;
									font-weight: 400;
									line-height: 1.6875rem;
								}
							}
						}
					}
				}
			}
		}
	}

	.sub-div {
		min-height: auto;
		padding: 3.5rem 0;
	}

	.divider {
		width: 100%;
		height: 0.5rem;
		position: absolute;
		bottom: -0.5rem;
		background-color: rgb(35, 35, 35);
	}
}

@media screen and (min-width: $mobile-screen) {
	.hero-cards {
		.hero-card {
			.hero-card-wrapper {
				max-width: calc(100% - 4rem);
			}
		}
		.main-div {
			min-height: 32rem;
			padding: 8.5rem 0 3rem;
			.main-div-wrapper {
				.content-wrapper {
					max-width: calc(100% - 4rem);
					.content {
						.start-watching-wrapper {
							.start-watching {
								content: "2";
								padding: 0 2rem;
							}
						}
					}
				}
			}
		}
		.sub-div {
			min-height: auto;
			padding: 4.5rem 0;
		}
	}
}

@media screen and (min-width: $small-tablet-screen) {
	.hero-cards {
		.hero-card {
			.hero-card-wrapper {
				max-width: calc(100% - 4rem);
				-webkit-flex-direction: row;
				-ms-flex-direction: row;
				flex-direction: row;

				&.image-on-left {
					-webkit-flex-direction: row-reverse;
					-ms-flex-direction: row-reverse;
					flex-direction: row-reverse;
				}

				&.image-on-right {
					-webkit-flex-direction: row;
					-ms-flex-direction: row;
					flex-direction: row;
				}

				.hero-card-content-split {
					[dir="rtl"] & {
						text-align: right;
					}
					[dir="ltr"] & {
						text-align: left;
					}
					padding-right: 0.375rem;
					.title {
						font-size: 3rem;
						font-weight: 900;
					}

					.description {
						font-size: 1.5rem;
						font-weight: 400;
					}
				}

				.hero-card-content {
					[dir="rtl"] & {
						text-align: right;
					}
					[dir="ltr"] & {
						text-align: left;
					}
					padding-left: 0.375rem;
					.title {
						font-size: 3rem;
						font-weight: 900;
					}

					.description {
						font-size: 1.5rem;
						font-weight: 400;
					}
				}

				.hero-card-media-wrapper {
					padding-left: 0.375rem;
				}
			}
		}
		.main-div {
			min-height: 43.75rem;
			padding: 9.875rem 0 4rem;
			.main-div-wrapper {
				.content-wrapper {
					max-width: calc(100% - 4rem);
					-webkit-flex-direction: column;
					-ms-flex-direction: column;
					flex-direction: column;

					.content {
						.title {
							font-size: 3rem;
							font-weight: 900;
						}
						.description {
							font-size: 1.5rem;
							font-weight: 400;
						}
						.start-watching-wrapper {
							.start-watching {
								content: "2";
								padding: 0 2.625rem;
								.form {
									.sub-description {
										font-size: 1.25rem;
										font-weight: 400;
										line-height: 1.875rem;
									}
								}
							}
						}
					}
				}
			}
		}
		.sub-div {
			min-height: auto;
			padding: 4.5rem 0;
		}
	}
}

@media screen and (min-width: $tablet-screen) {
	.hero-cards {
		.hero-card {
			.hero-card-wrapper {
				max-width: calc(83.33333333333334% - 6rem);
			}
		}
		.main-div {
			.main-div-wrapper {
				.content-wrapper {
					max-width: calc(83.33333333333334% - 6rem);
				}
			}
		}
	}
}

@media screen and (min-width: $desktop-screen) {
	.hero-cards {
		.hero-card {
			.hero-card-wrapper {
				max-width: calc(66.66666666666666% - 6rem);
			}
		}
		.main-div {
			.main-div-wrapper {
				.content-wrapper {
					max-width: calc(66.66666666666666% - 6rem);
				}
			}
		}
	}
}
</style>
