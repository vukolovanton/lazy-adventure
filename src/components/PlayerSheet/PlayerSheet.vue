<template>
	<div class="save-button-container">
		<button @click="handleSavePlayerSheet" class="main">Save</button>
	</div>
	<div class="player-sheet-container">
		<CharacterMainInfo />
		<CharacterAdditionalInfo />
		<BaseStats />
		<SkillList />
        <SavingThrows />
		<SpellsList />
		<Attacks />
	</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import CharacterMainInfo from './CharacterMainInfo.vue';
import CharacterAdditionalInfo from './CharacterAdditionalInfo.vue';
import BaseStats from './BaseStats.vue';
import SkillList from './SkillsList.vue';
import SpellsList from './SpellsList.vue';

import AuthService from '@/utils/auth/auth.service';
import PlayerService from '@/utils/auth/characterService';

import { useCharacterMainInfo } from '@/store/palyerStats/characterMainInfoStore';
import { useCharacterBaseStatsStore } from '@/store/palyerStats/characterBaseStatsStore';
import { useCharacterSkillsStore } from '@/store/palyerStats/characterSkillsStore';
import { useGlobalStore } from '@/store/globalStore';
import { errorHandler, getAvatarSource } from '@/utils/utils';
import {CharacterSheet, CharacterSheetStore} from "@/interfaces/CharacterSheet";
import {useCharacterHitPointsStore} from "@/store/palyerStats/characterHitPointsStore";
import {useCharacterSavingThrowsStore} from "@/store/palyerStats/characterSavingThrows";
import SavingThrows from "@/components/PlayerSheet/SavingThrows.vue";
import {useCharacterAttacksStore} from "@/store/palyerStats/characterAttacks";
import Attacks from "@/components/PlayerSheet/Attacks.vue";
import {useCharacterSpellsStore} from "@/store/palyerStats/characterSpellsStore";

const characterMainInfo = useCharacterMainInfo();
const characterBaseStats = useCharacterBaseStatsStore();
const characterSkills = useCharacterSkillsStore();
const characterHitPoints = useCharacterHitPointsStore();
const characterSavingThrows = useCharacterSavingThrowsStore();
const characterAttacks = useCharacterAttacksStore();
const characterSpells = useCharacterSpellsStore();
const globalStore = useGlobalStore();

const isLoading = ref(false);
const characterRef = ref(null);
const currentUser = AuthService.getCurrentUser();

onMounted(() => {
	getCharacterSheet();
});

async function getCharacterSheet() {
	isLoading.value = true;

	if (currentUser) {
		const response = await PlayerService.fetchCharacterByCharacterId("57");
		setSheetToStore(response);
        characterRef.value = response;
	}

	isLoading.value = false;
}

function setSheetToStore(character: CharacterSheet) {
	if (Object.keys(character).length > 0) {
		characterMainInfo.setCharacterMainInfo(character);
		characterBaseStats.setCharacterBaseStats(character);
        characterHitPoints.setCharacterHitPoints(character.hitPoints);
        characterSavingThrows.setCharacterSavingThrows(character.savingThrows, character.proficiency);
		characterSkills.setPlayerSkills(character.skills, character.proficiency);
        characterAttacks.setCharacterAttacks(character.attacks);
        characterSpells.setCharacterSpells(character.spells);
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

    const character = {
        characterId: characterRef.value.characterId,
        userId: currentUser.userId,
        name: characterMainInfo.$state.name,
        characterClass: characterMainInfo.$state.characterClass,
        level: characterMainInfo.$state.level,
        background: characterMainInfo.$state.background,
        race: characterMainInfo.$state.race,
        alignment: characterMainInfo.$state.alignment,
        exp: characterMainInfo.$state.exp,
        baseStats: characterBaseStats.$state,
        hitPoints: characterHitPoints.$state,
        skills: characterSkills.$state.skills,
        savingThrows: characterSavingThrows.$state.savingThrows,
        attacks: characterAttacks.$state.attacks,
        spells: characterSpells.$state,
    }

	PlayerService.updateCharacter(character)
		.then(() => globalStore.setIsSuccess('Character sheet saved successfully'))
		.catch(errorHandler);
}

//onBeforeUnmount(() => {
//	handleSavePlayerSheet();
//});
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
		'BaseInfo BaseInfo SkillList'
		'BaseStats AdditionalInfo SkillList'
		'BaseStats SpellsList Attacks'
		'BaseStats SpellsList Attacks';
	max-width: 70vw;
	margin: 0 auto;
}

.SpellsList {
	grid-area: SpellsList;
}

.Attacks {
	grid-area: Attacks;
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
