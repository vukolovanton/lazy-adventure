<template>
	<div class="save-button-container">
		<button @click="handleSavePlayerSheet" class="main">Save</button>
	</div>
	<div class="player-sheet-container">
		<CharacterMainInfo />
<!--		<CharacterAdditionalInfo />-->
		<BaseStats />
		<SkillList />
		<SpellsList />
		<InventoryList />
	</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import CharacterMainInfo from './CharacterMainInfo.vue';
import CharacterAdditionalInfo from './CharacterAdditionalInfo.vue';
import BaseStats from './BaseStats.vue';
import SkillList from './SkillsList.vue';
import SpellsList from './SpellsList.vue';
import InventoryList from './InventoryList.vue';

import { Player } from '@/interfaces/Player';
import AuthService from '@/utils/auth/auth.service';
import PlayerService from '@/utils/auth/player.service';

import { useCharacterMainInfo } from '@/store/palyerStats/characterMainInfoStore';
import { useCharacterBaseStatsStore } from '@/store/palyerStats/characterBaseStatsStore';
import { usePlayerBaseStats } from '@/store/palyerStats/playerBaseStatsStore';
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';
import { usePlayerInventoryStore } from '@/store/palyerStats/playerInventoryStore';
import { useGlobalStore } from '@/store/globalStore';
import { errorHandler, getAvatarSource } from '@/utils/utils';
import {CharacterSheet} from "@/interfaces/CharacterSheet";

const characterMainInfo = useCharacterMainInfo();
const characterBaseStats = useCharacterBaseStatsStore();
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
		const response = await PlayerService.fetchCharacterSheet("57");
		setSheetToStore(response);
	}

	isLoading.value = false;
}

function setSheetToStore(character: CharacterSheet) {
	if (Object.keys(character).length > 0) {
		characterMainInfo.setCharacterMainInfo(character);
		characterBaseStats.setCharacterBaseStats(character);
//		playerBaseStatsStore.setPlayerBaseStats(player.baseStats);
//		playerSkillsStore.setPlayerSkills(player.skills);
//		playerSpellsStore.setPlayerSpells(player.spells);
//		playerInventoryStore.setPlayerInventory(player.inventory);

//		globalStore.setAvatarSource(
//			getAvatarSource(player.baseInfo.characterClass, player.baseInfo.gender)
//		);
	}

	isLoading.value = false;
}

function handleSavePlayerSheet() {
	if (!currentUser) {
		return;
	}

	const player: Player = {
		userId: currentUser.user.id,
		baseInfo: characterMainInfo.$state,
		additionalInfo: characterBaseStats.$state,
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
