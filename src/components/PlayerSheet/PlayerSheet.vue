<template>
	<div class="save-button-container">
		<button @click="handleSavePlayerSheet" class="main">Save</button>
	</div>
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
import { onBeforeUnmount, onMounted, ref } from 'vue';

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
import { useGlobalStore } from '@/store/globalStore';
import { errorHandler, getAvatarSource } from '@/utils/utils';

const playerBaseInfoStore = usePlayerBaseInfo();
const playerAdditionalInfoStore = usePlayerAdditionalInfo();
const playerBaseStatsStore = usePlayerBaseStats();
const playerSkillsStore = usePlayerSkillsStore();
const playerSpellsStore = usePlayerSpellsStore();
const playerInventoryStore = usePlayerInventoryStore();
const globalStore = useGlobalStore();

const isLoading = ref(false);
const currentUser = AuthService.getCurrentUser();

onMounted(() => {
	getPlayersSheet();
});

async function getPlayersSheet() {
	isLoading.value = true;

	if (currentUser) {
		const response = await PlayerService.fetchPlayer(currentUser.user.id);
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

		globalStore.setAvatarSource(
			getAvatarSource(player.baseInfo.characterClass, player.baseInfo.gender)
		);
	}

	isLoading.value = false;
}

function handleSavePlayerSheet() {
	if (!currentUser) {
		return;
	}

	const player: Player = {
		userId: currentUser.user.id,
		baseInfo: playerBaseInfoStore.$state,
		additionalInfo: playerAdditionalInfoStore.$state,
		baseStats: playerBaseStatsStore.$state,
		skills: playerSkillsStore.$state.skills,
		spells: playerSpellsStore.$state.spells,
		inventory: playerInventoryStore.$state.inventory,
	};

	PlayerService.savePlayer(player)
		.then(() => globalStore.setIsSuccess('Player sheet saved successfully'))
		.catch(errorHandler);
}

onBeforeUnmount(() => {
	handleSavePlayerSheet();
});
</script>

<style>
.save-button-container {
	margin-top: 2em;
	margin-bottom: 2em;
	text-align: center;
}
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
