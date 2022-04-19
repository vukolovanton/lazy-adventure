<template>
	<div>
		<span>{{ label }}</span>
		<span>{{ value }}</span>
		<div>
			<button @click="$emit('setIncrementableValue', '-')">-</button>
			<button @click="$emit('setIncrementableValue', '+')">+</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	label: String,
	value: Number,
});
defineEmits(['setIncrementableValue']);
</script>
