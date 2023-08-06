<template>
	<div class="hero-cards">
		<div class="hero-card" v-for="(card, index) in props.cards" :key="card.id" :class="{ 'image-on-left': index % 2 !== 0, 'image-on-right': index % 2 === 0 }">
			<div class="hero-card-media">
				<div class="media-wrapper">
					<img v-if="card.image" :src="card.image" />
					<div v-if="card.video" :class="['video-wrapper', index === 0 ? 'first-video' : 'second-video']">
						<video :src="card.video" autoplay loop muted></video>
					</div>
				</div>
			</div>

			<div class="hero-card-content">
				<h1>{{ card.title }}</h1>
				<div>{{ card.description }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps({
	cards: {
		type: Array as () => Array<{
			id: number;
			title: string;
			description: string;
			image?: string;
			video?: string;
		}>,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.hero-cards {
	display: flex;
	flex-direction: column;

	.hero-card {
		height: 63vh;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 0.8rem solid $divider;
		padding: 0 27rem;

		&.image-on-left {
			.hero-card-media {
				order: 1;
			}
			.hero-card-content {
				order: 2;
			}
		}

		&.image-on-right {
			.hero-card-media {
				order: 2;
			}
			.hero-card-content {
				order: 1;
			}
		}

		.hero-card-media {
			position: relative;
			.media-wrapper {
				position: relative;
				img {
					position: relative;
					overflow-clip-margin: content-box;
					overflow: clip;
					z-index: 2;
				}

				.video-wrapper {
					position: absolute;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 100%;
					height: auto;

					&.first-video {
						max-width: 73%;
						max-height: 54%;
						top: 48%;
					}

					&.second-video {
						max-width: 63%;
						max-height: 47%;
						top: 38%;

						video {
							width: 100%;
							height: 100%;
							z-index: 0;
							object-fit: cover;
						}
					}
				}
			}
		}

		.hero-card-content {
			position: relative;
			padding: 0 2rem;
			color: $white;
			font-size: 2rem;
			font-weight: 700;
			z-index: 1;

			h1 {
				display: flex;
				font-size: 3.5rem;
				font-weight: 1000;
				line-height: 1;
			}

			div {
				font-size: 2rem;
				font-weight: 400;
				line-height: 1;
			}
		}
	}
}
</style>
