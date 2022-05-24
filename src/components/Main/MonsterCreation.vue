<template>
	<div class="container border border-2">
		<details class="details" ref="detailsRef">
			<summary>{{ props.type }}:</summary>
			<div class="monster-list-wrapper">
				<div v-for="item in state.monstersList" class="monster-item">
					<img width="16" height="16" :src="item.url" />
					<span @click="handleSetMonsterTypeWrapper(item.url, item.name)">{{
						item.name.slice(0, -4)
					}}</span>
				</div>
			</div>
		</details>
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
		<button @click="handleAddMonster" :disabled="!props.isFilled">Add</button>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import TilesService from '@/utils/tiles.service';
import { TilesSources } from '@/interfaces/TilesEditorInterfaces';
import SmallTextInput from '@/components/common/SmallTextInput.vue';

const props = defineProps([
	'name',
	'type',
	'hitPoints',
	'isFilled',
	'handleSetMonsterName',
	'handleSetMonsterHitPoints',
	'handleAddMonster',
	'handleSetMonsterType',
]);

const state = reactive({
	monstersList: [] as TilesSources[],
	open: false,
});

const detailsRef = ref();

function handleSetMonsterTypeWrapper(url: string, type: string) {
	props.handleSetMonsterType(url, type.slice(0, -4));
	detailsRef.value.open = false;
}

onMounted(() => {
	TilesService.fetchMonstersList().then((monsters) => {
		state.monstersList = monsters;
	});
});
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	align-items: flex-start;
	gap: 1em;
	width: 100%;
	margin-bottom: 2em;
}

.details {
	position: relative;

	& > summary {
		cursor: pointer;
	}

	& > .monster-list-wrapper {
		position: absolute;
		top: 2em;
		right: 0;

		background-color: bisque;
		border: 1px solid black;
		z-index: 10;
		padding: 0.2em;

		width: 600px;
		max-width: 600px;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;

		& > .monster-item {
			cursor: pointer;
			max-width: max-content;
			padding: 0.2em 0.4em;
			border: 1px solid black;

			&:hover {
				background-color: black;
				color: white;
			}
		}
	}
}
</style>
