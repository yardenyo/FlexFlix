<template>
	<div class="not-found">
		<div class="content">
			<h1 class="title">Lost your way?</h1>
			<div class="sub-title">Sorry, we can't find that page. You'll find lots to explore on the home page.</div>
			<Button class="button" label="Go to Home Page" severity="danger" @click="goBackHome" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goBackHome() {
	router.push("/");
}
</script>

<style lang="scss" scoped>
$logo-section-height: 100px;
.not-found {
	.content {
		background: url("/src/assets/404NotFound.jpg");
		background-size: cover;
		height: calc(100vh - #{$logo-section-height});
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		text-align: center;

		.title {
			font-size: 6rem;
			font-weight: 500;
			margin-bottom: 2vw;
			z-index: 1;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.57);
		}

		.sub-title {
			width: 45%;
			word-wrap: break-word;
			line-height: 1.2;
			font-size: 2.2rem;
			font-weight: 300;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.57);
			padding: 3rem 0;
		}

		.button {
			width: 200px;
		}
	}
}
</style>
