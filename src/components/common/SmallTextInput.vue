<template>
	<div class="input-container">
		<input
			spellcheck="false"
			:class="calculatedClass"
			:type="type"
			:id="id"
			v-model="inputValue"
			@input="$emit('setInputValue', inputValue)"
		/>
		<label :for="id">{{ label }}</label>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
	label: String,
	id: String,
	inputValue: [String, Number],
	type: {
		type: String,
		default: 'text',
	},
});
defineEmits(['setInputValue']);

const calculatedClass = computed(
	() =>
		`${props.type && props.type === 'number' ? 'input-number' : 'input-field'}`
);
</script>

<style scoped lang="scss">
.input-container {
	display: flex;
	flex-direction: column;
	max-width: 5em;

	& > label {
		font-size: 0.6em;
	}

	& > input {
		background: none;
		border: 0;
		border-bottom: 1px solid #ccc;
	}

	& > input.input-number {
		font-size: 2.5em;
		max-width: 1.7em;
		max-height: 1.3em;
		border-bottom: none;
	}

	& > input.exp {
		font-size: 2.5em;
		max-width: 5em;
	}
}
</style>
