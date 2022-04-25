import { defineStore } from 'pinia';
import { PlayerBaseStats } from '@/interfaces/PlayerStats';
import { StoreIds } from '@/constants';

export const usePlayerBaseStats = defineStore(StoreIds.PlayerBaseStats, {
	state: (): PlayerBaseStats => ({
		strength: 0,
		dexterety: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	}),

	actions: {
		setPlayerBaseStats(baseStats: PlayerBaseStats) {
			this.strength = baseStats.strength;
			this.dexterety = baseStats.dexterety;
			this.constitution = baseStats.constitution;
			this.intelligence = baseStats.intelligence;
			this.wisdom = baseStats.wisdom;
			this.charisma = baseStats.charisma;
		},
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

	persist: true,
});
