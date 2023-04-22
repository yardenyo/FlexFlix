<template>
	<div class="application-view">
		<RouterView />
	</div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="scss">
.application-view {
	height: 100%;
	width: 100%;
	margin: auto;
}
</style>
