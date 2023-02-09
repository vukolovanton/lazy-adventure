import { defineStore } from 'pinia';
import { trimString } from '@/utils/utils';
import { StoreIds } from '@/constants';
import {CharacterSheetSpells} from "@/interfaces/CharacterSheet";

type CharacterSpellsStore = {
    spells: CharacterSheetSpells[];
};

export const useCharacterSpellsStore = defineStore(StoreIds.CharacterSpells, {
    state: (): CharacterSpellsStore => ({
        spells: [],
    }),

    actions: {
        setCharacterSpells(spells: CharacterSheetSpells[]) {
            this.spells = spells;
        },
        setNewSpell(spell: CharacterSheetSpells) {
            this.spells.push(spell);
        },
        removeSpell(spell: CharacterSheetSpells) {
            const newState = this.spells.filter(
                    (s) => trimString(s.spellName) !== trimString(spell.spellName));
            this.spells = newState;
        }
    },

    persist: true,
});
