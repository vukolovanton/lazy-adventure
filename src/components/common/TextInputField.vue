<template>
	<div class="input-container">
		<input
            :disabled="disabled"
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
    disabled: {
        type: Boolean,
        default: false,
    },
	type: {
		type: String,
		default: 'text',
	},
});
defineEmits(['setInputValue']);

const calculatedClass = computed(
	() =>
		`${
			props.type && props.type === 'number' ? 'input-number' : 'input-field'
		} ${props.label && props.label === 'Experience' ? 'exp' : ''}`
);
</script>

<style scoped lang="scss" src="@/components/common/textInputField.scss"></style>
