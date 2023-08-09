<template>
	<div class="faq">
		<div class="questions">
			<ul class="questions-list">
				<li v-for="item in state.faqItems" :key="item.id" class="question">
					<h3>
						<button @click="toggleAnswer(item.id)">
							<span>{{ item.question }}</span>
							<i :class="item.expanded ? 'pi pi-times' : 'pi pi-plus'"></i>
						</button>
					</h3>
					<div :class="['answer-wrapper', { expanded: item.expanded }]">
						<span>{{ item.answer }}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, reactive, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import Helpers from "@/helpers/app.helpers";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const props = defineProps({
	faq: {
		type: Array as () => Array<{
			id: number;
			question: string;
			answer: string;
			expanded?: boolean;
		}>,
		required: true,
	},
});

const state = reactive({
	faqItems: props.faq.map((item) => ({
		...item,
		expanded: false,
	})),
});

const toggleAnswer = (itemId: number) => {
	state.faqItems = state.faqItems.map((item) => {
		if (item.id === itemId) {
			return { ...item, expanded: !item.expanded };
		} else {
			return item;
		}
	});
};
</script>

<style scoped lang="scss">
.faq {
	.questions {
		margin: 1.5rem 0 0;

		.questions-list {
			list-style: none;
			padding: 0;
			margin: 0;
			font-size: 1.5rem;
			font-weight: 400;

			.question {
				list-style-type: none;
				margin: 0;
				padding: 0;
				text-indent: 0;
				margin: 0 0 0.5rem 0;

				h3 {
					margin: 0;
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					display: flex;
					font-size: inherit;
					font-weight: inherit;
					margin-bottom: 0.0625rem;
					position: relative;
					background-color: rgb(45, 45, 45);
					color: rgb(255, 255, 255);
					transition-duration: 250ms;
					transition-property: background-color;
					transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);

					button {
						-webkit-appearance: none;
						-moz-appearance: none;
						-ms-appearance: none;
						appearance: none;
						background: none;
						border-radius: 0;
						border: 0;
						box-sizing: content-box;
						color: inherit;
						cursor: default;
						display: inline;
						font: inherit;
						letter-spacing: inherit;
						line-height: inherit;
						margin: 0;
						padding: 0;
						-webkit-text-decoration: none;
						text-decoration: none;
						width: 100%;
						background: none;
						padding: 1.5rem;
						border: none;
						cursor: pointer;
						display: -webkit-box;
						display: -webkit-flex;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-pack: justify;
						-webkit-justify-content: space-between;
						justify-content: space-between;
						-webkit-align-items: center;
						-webkit-box-align: center;
						-ms-flex-align: center;
						align-items: center;
						color: inherit;
						font-family: inherit;
						font-size: inherit;
						text-align: left;
					}
				}

				.answer-wrapper {
					overflow: hidden;
					visibility: visible;
					max-height: 0px;
					padding: 0px 1.5rem;
					transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1) 0s;
					text-align: left;
					background-color: rgb(45, 45, 45);
					color: rgb(255, 255, 255);

					span {
						overflow: hidden;
						visibility: visible;
						max-height: 0px px;
						transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1) 0s;
						text-align: left;
						background-color: rgb(45, 45, 45);
						color: rgb(255, 255, 255);
					}
				}

				.expanded {
					max-height: 75rem;
					padding-bottom: 1.5rem;
					padding-top: 1.5rem;
				}
			}
		}
	}
}
</style>
