<template>
	<div>
		<label :for="id">{{ label }}</label>
		<input
			:type="type"
			:id="id"
			v-model="inputValue"
			@input="$emit('setInputValue', inputValue)"
		/>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	label: String,
	id: String,
	inputValue: [String, Number],
	type: {
		type: String,
		default: 'text',
	},
});
defineEmits(['setInputValue']);
</script>
