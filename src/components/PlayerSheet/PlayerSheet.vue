<template>
	<div class="player-sheet-container">
		<BaseInfo />
		<AdditionalInfo />
		<BaseStats />
		<SkillList />
		<SpellsList />
		<InventoryList />
	</div>
	<button @click="handleSavePlayerSheet" class="main">Save</button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import BaseInfo from './BaseInfo.vue';
import AdditionalInfo from './AdditionalInfo.vue';
import BaseStats from './BaseStats.vue';
import SkillList from './SkillsList.vue';
import SpellsList from './SpellsList.vue';
import InventoryList from './InventoryList.vue';

import { Player } from '@/interfaces/Player';
import AuthService from '@/utils/auth/auth.service';
import PlayerService from '@/utils/auth/player.service';

import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';
import { usePlayerBaseStats } from '@/store/palyerStats/playerBaseStatsStore';
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';
import { usePlayerInventoryStore } from '@/store/palyerStats/playerInventoryStore';

const playerBaseInfoStore = usePlayerBaseInfo();
const playerAdditionalInfoStore = usePlayerAdditionalInfo();
const playerBaseStatsStore = usePlayerBaseStats();
const playerSkillsStore = usePlayerSkillsStore();
const playerSpellsStore = usePlayerSpellsStore();
const playerInventoryStore = usePlayerInventoryStore();

const isLoading = ref(false);

onMounted(() => {
	getPlayersSheet();
});

async function getPlayersSheet() {
	isLoading.value = true;

	const currentUser = AuthService.getCurrentUser();
	if (currentUser) {
		const response = await PlayerService.fetchPlayer(currentUser.id);
		const result = await Promise.resolve(response);

		setSheetToStore(result);
	}

	isLoading.value = false;
}

function setSheetToStore(player: Player) {
	if (Object.keys(player).length > 0) {
		playerBaseInfoStore.setPlayerBaseInfo(player.baseInfo);
		playerAdditionalInfoStore.setPlayerAdditionalInfo(player.additionalInfo);
		playerBaseStatsStore.setPlayerBaseStats(player.baseStats);
		playerSkillsStore.setPlayerSkills(player.skills);
		playerSpellsStore.setPlayerSpells(player.spells);
		playerInventoryStore.setPlayerInventory(player.inventory);
	}

	isLoading.value = false;
}

function handleSavePlayerSheet() {
	const user = AuthService.getCurrentUser();
	if (!user) {
		return;
	}

	const player: Player = {
		userId: user.id,
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
	gap: 1.5em 4em;
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
