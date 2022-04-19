import { defineStore } from 'pinia';
import { PlayerAdditionalInfo } from '@/interfaces/PlayerStats';

export const usePlayerAdditionalInfo = defineStore('playerAdditionalInfo', {
	state: (): PlayerAdditionalInfo => ({
		armorClass: 0,
		initiative: 0,
		speed: 0,
		currentHitPoints: 0,
		maximumHitPoints: 0,
		temporaryHitPoints: 0,
		hitDice: 0,
		deathSaves: [
			[true, false, false],
			[false, true, true],
		],
	}),

	actions: {
		setArmorClass(armorClass: number) {
			this.armorClass = armorClass;
		},
		setInitiative(initiative: number) {
			this.initiative = initiative;
		},
		setSpeed(speed: number) {
			this.speed = speed;
		},
		setCurrentHitPoints(currentHitPoints: number) {
			this.currentHitPoints = currentHitPoints;
		},
		setMaximumHitPoints(maximumHitPoints: number) {
			this.maximumHitPoints = maximumHitPoints;
		},
		setTemporaryHitPoints(temporaryHitPoints: number) {
			this.temporaryHitPoints = temporaryHitPoints;
		},
		setHitDice(hitDice: number) {
			this.hitDice = hitDice;
		},
		setDeathSaves(type: number, index: number, value: boolean) {
			this.deathSaves[type][index] = value;
		},
	},
});
