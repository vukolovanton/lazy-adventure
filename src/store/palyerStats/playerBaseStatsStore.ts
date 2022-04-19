import { defineStore } from 'pinia';
import { PlayerBaseStats } from '@/interfaces/PlayerStats';

export const usePlayerBaseStats = defineStore('playerBaseStats', {
	state: (): PlayerBaseStats => ({
		strength: 0,
		dexterety: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	}),

	actions: {
		setStength(strength: number) {
			this.strength = strength;
		},
		setDexterety(dexterety: number) {
			this.dexterety = dexterety;
		},
		setConstitution(constitution: number) {
			this.constitution = constitution;
		},
		setIntelligence(intelligence: number) {
			this.intelligence = intelligence;
		},
		setWisdom(wisdom: number) {
			this.wisdom = wisdom;
		},
		setCharisma(charisma: number) {
			this.charisma = charisma;
		},
	},
});
