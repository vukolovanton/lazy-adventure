<template>
	<div class="save-button-container">
		<button @click="handleSavePlayerSheet" class="main">Save</button>
	</div>
	<div class="player-sheet-container">
		<CharacterMainInfo />
		<CharacterAdditionalInfo />
		<BaseStats />
		<SkillList />
        <AttacksAndSpells />
	</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import CharacterMainInfo from './CharacterMainInfo.vue';
import CharacterAdditionalInfo from './CharacterAdditionalInfo.vue';
import BaseStats from './BaseStats.vue';
import SkillList from './SkillsList.vue';

import AuthService from '@/utils/auth/auth.service';
import PlayerService from '@/utils/auth/characterService';

import { useCharacterMainInfo } from '@/store/palyerStats/characterMainInfoStore';
import { useCharacterBaseStatsStore } from '@/store/palyerStats/characterBaseStatsStore';
import { useCharacterSkillsStore } from '@/store/palyerStats/characterSkillsStore';
import { useGlobalStore } from '@/store/globalStore';
import { errorHandler, getAvatarSource } from '@/utils/utils';
import {CharacterSheet} from "@/interfaces/CharacterSheet";
import {useCharacterHitPointsStore} from "@/store/palyerStats/characterHitPointsStore";
import {useCharacterSavingThrowsStore} from "@/store/palyerStats/characterSavingThrows";
import {useCharacterAttacksStore} from "@/store/palyerStats/characterAttacks";
import {useCharacterSpellsStore} from "@/store/palyerStats/characterSpellsStore";
import { GET_DEFAULT_CHARACTER } from "@/constants";
import AttacksAndSpells from "@/components/PlayerSheet/AttacksAndSpells.vue";

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
const currentUser = AuthService.getCurrentUserFromLocalStorage();

onMounted(() => {
	getCharacterSheet();
});

async function getCharacterSheet() {
	isLoading.value = true;

	if (currentUser) {
		const response = await PlayerService.fetchCharacterByCharacterName(currentUser.characterName);
        if (response) {
            setSheetToStore(response);
            characterRef.value = response;
        } else {
            const defaultCharacter = GET_DEFAULT_CHARACTER(currentUser.characterName, currentUser.userId);
            setSheetToStore(defaultCharacter);
            characterRef.value = defaultCharacter;
        }
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
		globalStore.setAvatarSource(
			getAvatarSource(character.characterClass, character.gender)
		);
	}

	isLoading.value = false;
}

function handleSavePlayerSheet() {
	if (!currentUser) {
		return;
	}

    const character = {
        name: characterMainInfo.$state.name,
        userId: currentUser.userId,
        gender: characterMainInfo.$state.gender,
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
        spells: characterSpells.$state.spells,
    }

	PlayerService.updateCharacter(character)
		.then(() => globalStore.setIsSuccess('Character sheet saved successfully'))
		.catch(errorHandler);
}
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
	grid-template-rows: min-content min-content min-content;
	gap: 1.5em 4em;
	grid-auto-flow: row;
	grid-template-areas:
		'CharacterMainInfo CharacterAdditionalInfo SkillList'
		'BaseStats AttacksAndSpells SkillList'
		'BaseStats AttacksAndSpells .';
	max-width: 70vw;
	margin: 0 auto;
}

.Attacks {
	grid-area: Attacks;
}
</style>
