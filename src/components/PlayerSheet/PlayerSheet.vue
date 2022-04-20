<template>
	<div class="player-sheet-container">
		<BaseInfo />
		<AdditionalInfo />
		<BaseStats />
		<SkillList />
		<SpellsList />
		<InventoryList />
	</div>
</template>

<script lang="ts" setup>
import BaseInfo from './BaseInfo.vue';
import AdditionalInfo from './AdditionalInfo.vue';
import BaseStats from './BaseStats.vue';
import SkillList from './SkillsList.vue';
import SpellsList from './SpellsList.vue';
import InventoryList from './InventoryList.vue';
</script>

<style>
.player-sheet-container {
	display: grid;
	grid-template-columns: 0.5fr 1.5fr 1fr;
	grid-template-rows: min-content min-content min-content min-content;
	gap: 1em 1em;
	grid-auto-flow: row;
	grid-template-areas:
		'BaseInfo BaseInfo BaseInfo'
		'BaseStats AdditionalInfo SkillList'
		'BaseStats SpellsList InventoryList'
		'BaseStats SpellsList InventoryList';
	max-width: 70vw;
	margin: 0 auto;
}

.SpellsList {
	grid-area: SpellsList;
}

.InventoryList {
	grid-area: InventoryList;
}

.BaseInfo {
	justify-self: stretch;
	align-self: stretch;
	grid-area: BaseInfo;
}

.BaseStats {
	grid-area: BaseStats;
}

.AdditionalInfo {
	grid-area: AdditionalInfo;
}

.SkillList {
	grid-area: SkillList;
	justify-self: stretch;
}
</style>
