<template>
	<div>
		<SmallTextInput
			label="Monster Name"
			id="monsterName"
			:input-value="props.name"
			@set-input-value="props.handleSetMonsterName"
		/>
		<SmallTextInput
			label="Monster Hit Points"
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
