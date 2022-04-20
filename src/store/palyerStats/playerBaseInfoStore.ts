import { defineStore } from 'pinia';
import { PlayerBaseInfo } from '@/interfaces/PlayerStats';

export const usePlayerBaseInfo = defineStore('playerBaseInfo', {
	state: (): PlayerBaseInfo => ({
		characterName: 'Dickalion',
		characterClass: 'Paladin',
		level: 1,
		race: 'Elf',
		aligment: 'Lawfull-Evil',
		experience: 1230,
	}),

	actions: {
		setCharacterName(name: string) {
			this.characterName = name;
		},
		setCharacterClass(characterClass: string) {
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
});
