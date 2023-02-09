import { defineStore } from 'pinia';
import { InventoryItem } from '@/interfaces/PlayerInventory';
import { trimString } from '@/utils/utils';
import { StoreIds } from '@/constants';
import {CharacterSheetAttacks} from "@/interfaces/CharacterSheet";

type CharacterAttacksStore = {
    attacks: CharacterSheetAttacks[];
};

export const useCharacterAttacksStore = defineStore(StoreIds.CharacterAttacks, {
    state: (): CharacterAttacksStore => ({
        attacks: [],
    }),

    actions: {
        setCharacterAttacks(attacks: CharacterSheetAttacks[]) {
            this.attacks = attacks;
        },
        setNewCharacterAttack(attack: CharacterSheetAttacks) {
            this.attacks.push(attack);
        },
        removeCharacterAttack(attack: CharacterSheetAttacks) {
            const newState = this.attacks.filter(a => trimString(a.name) !== trimString(attack.name));
            this.attacks = newState;
        }
    },

    persist: true,
});
