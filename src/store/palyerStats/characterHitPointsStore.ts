import { defineStore } from 'pinia';
import { StoreIds } from '@/constants';
import {CharacterSheetHitPoints} from "@/interfaces/CharacterSheet";

export const useCharacterHitPointsStore = defineStore(StoreIds.CharacterHitPoints, {
    state: (): CharacterSheetHitPoints => ({
        hitPointMaximum: 0,
        currentHitPoints: 0,
        temporaryHitPoints: 0,
        hitDice: '',
    }),

    actions: {
        setCharacterHitPoints(characterHitPoints: CharacterSheetHitPoints) {
            this.hitPointMaximum = characterHitPoints.hitPointMaximum;
            this.currentHitPoints = characterHitPoints.currentHitPoints;
            this.temporaryHitPoints = characterHitPoints.temporaryHitPoints;
            this.hitDice = characterHitPoints.hitDice;
        },
        setHitPointsMaximum(hitPoints: number) {
            this.hitPointMaximum = hitPoints;
        },
        setCurrentHitPoints(currentHitPoints: number) {
            this.currentHitPoints = currentHitPoints;
        },
        setTemporaryHitPoints(temporaryHitPoints: number) {
            this.temporaryHitPoints = temporaryHitPoints;
        },
        setHitDice(hitDice: string) {
            this.hitDice = hitDice;
        }
    },

    persist: true,
});
