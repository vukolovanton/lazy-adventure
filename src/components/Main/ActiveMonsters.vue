<template>
	<div class="active-monsters-container">
		<strong class="monster-name">{{ user.username }}</strong>
		<button @click="handleDelete">X</button>

		<div class="hit-points-wrapper">
			<SmallTextInput
				label="Hit Points"
				id="monsterHitPoints"
				:input-value="user.details.stats.currentHitPoints"
				@set-input-value="debouncedFn"
			/>
			<span> / {{ user.details.stats.maximumHitPoints }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';
import SmallTextInput from '../common/SmallTextInput.vue';
const props = defineProps([
	'user',
	'handleDeleteMonster',
	'handleUpdateMonsterHitPoints',
]);

const debouncedFn = useDebounceFn((value: any) => {
	handleSetMonsterHitPointsWrapper(value);
}, 2000);

function handleSetMonsterHitPointsWrapper(value: string) {
	const hitPoints = parseInt(value, 10);
	if (isNaN(hitPoints)) {
		return;
	}

	props.handleUpdateMonsterHitPoints(hitPoints, props.user.details.userId);
}

function handleDelete() {
	props.handleDeleteMonster(props.user.details.userId);
}
</script>

<style lang="scss">
.active-monsters-container {
	display: inline-block;
	border: 2px solid var(--accent-color);
	border-radius: 10px;
	padding: 0.2em 0.4em;
	margin-bottom: 1em;

	& button,
	span {
		margin-left: 1em;
	}
}

.hit-points-wrapper {
	display: flex;
}
</style>
