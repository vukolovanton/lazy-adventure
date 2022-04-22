import { defineStore } from 'pinia';
import { PlayerBaseInfo } from '@/interfaces/PlayerStats';

export const usePlayerBaseInfo = defineStore('playerBaseInfo', {
	state: (): PlayerBaseInfo => {
		return {
			characterName: '',
			characterClass: '',
			level: 1,
			race: '',
			aligment: '',
			experience: 0,
		};
	},

	actions: {
		setPlayerBaseInfo(baseInfo: PlayerBaseInfo) {
			this.characterName = baseInfo.characterName;
			this.characterClass = baseInfo.characterClass;
			this.level = baseInfo.level;
			this.race = baseInfo.race;
			this.aligment = baseInfo.aligment;
			this.experience = baseInfo.experience;
		},
		setCharacterName(name: string) {
			this.characterName = name;
		},
		setCharacterClass(characterClass: string) {
			console.log(characterClass);
			this.characterClass = characterClass;
		},
		setLevel(level: number) {
			this.level = level;
		},
		incrementLevel() {
			this.level++;
		},
		decrementLevel() {
			if (this.level === 1) return;
			this.level--;
		},
		setRace(race: string) {
			this.race = race;
		},
		setAligment(aligment: string) {
			this.aligment = aligment;
		},
		setExperience(experience: number) {
			this.experience = experience;
		},
	},

	persist: true,
});
