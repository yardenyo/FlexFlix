<template>
	<div class="dashboard">1234</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app.store";
import Helpers from "@/helpers/app.helpers";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const store = useAppStore();
const { appState } = storeToRefs(store);
const router = useRouter();
const { t } = useI18n();
</script>

<style scoped lang="scss"></style>
