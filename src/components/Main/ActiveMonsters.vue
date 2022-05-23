<template>
	<span>{{ user.username }}</span>
	<span>{{ user.details.stats.maximumHitPoints }}</span>
	<button @click="handleDelete">X</button>
</template>

<script lang="ts" setup>
const props = defineProps(['user', 'handleDeleteMonster']);

function handleDelete() {
	props.handleDeleteMonster(props.user.details.userId);
}
</script>
