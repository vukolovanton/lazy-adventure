<template>
	<div class="player-sheet-container">
		<BaseInfo />
		<AdditionalInfo />
		<BaseStats />
		<SkillList />
		<SpellsList />
		<InventoryList />
	</div>
	<button @click="handleSavePlayerSheet">Save</button>
</template>

<script lang="ts" setup>
import PlayerService from '@/utils/auth/player.service';
import BaseInfo from './BaseInfo.vue';
import AdditionalInfo from './AdditionalInfo.vue';
import BaseStats from './BaseStats.vue';
import SkillList from './SkillsList.vue';
import SpellsList from './SpellsList.vue';
import InventoryList from './InventoryList.vue';

import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';
import { usePlayerBaseStats } from '@/store/palyerStats/playerBaseStatsStore';
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';
import { usePlayerInventoryStore } from '@/store/palyerStats/playerInventoryStore';
import { Player } from '@/interfaces/Player';
import AuthService from '@/utils/auth/auth.service';

const playerBaseInfoStore = usePlayerBaseInfo();
const playerAdditionalInfoStore = usePlayerAdditionalInfo();
const playerBaseStatsStore = usePlayerBaseStats();
const playerSkillsStore = usePlayerSkillsStore();
const playerSpellsStore = usePlayerSpellsStore();
const playerInventoryStore = usePlayerInventoryStore();

function handleSavePlayerSheet() {
	const user = AuthService.getCurrentUser();
	if (!user) {
		return;
	}

	const player: Player = {
		userId: user.user.id,
		baseInfo: playerBaseInfoStore.$state,
		additionalInfo: playerAdditionalInfoStore.$state,
		baseStats: playerBaseStatsStore.$state,
		skills: playerSkillsStore.$state.skills,
		spells: playerSpellsStore.$state.spells,
		inventory: playerInventoryStore.$state.inventory,
	};

	PlayerService.savePlayer(player);
}
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
