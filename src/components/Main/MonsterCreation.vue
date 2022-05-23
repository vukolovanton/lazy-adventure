<template>
	<div class="container">
		<SmallTextInput
			label="Name"
			id="monsterName"
			:input-value="props.name"
			@set-input-value="props.handleSetMonsterName"
		/>
		<SmallTextInput
			label="Hit Points"
			id="monsterHitPoints"
			:input-value="props.hitPoints"
			@set-input-value="props.handleSetMonsterHitPoints"
		/>
		<button @click="handleAddMonster">Add Monster</button>
	</div>
</template>

<script setup lang="ts">
import SmallTextInput from '@/components/common/SmallTextInput.vue';

const props = defineProps([
	'name',
	'hitPoints',
	'handleSetMonsterName',
	'handleSetMonsterHitPoints',
	'handleAddMonster',
]);
</script>

<style lang="scss">
.container {
	display: flex;
	align-items: flex-start;
	gap: 1em;
}
</style>
