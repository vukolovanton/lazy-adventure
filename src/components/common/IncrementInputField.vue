<template>
	<div class="container">
		<span>{{ label }}</span>
		<span class="value">{{ value }}</span>
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

<style scoped lang="scss">
.value {
	margin-left: 0.4em;
	font-weight: bold;
}
</style>
