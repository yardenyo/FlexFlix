<template>
	<RouterView :dir="$i18n.locale === 'he' ? 'rtl' : 'ltr'" />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="scss"></style>
