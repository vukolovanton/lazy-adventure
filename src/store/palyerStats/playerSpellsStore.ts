import { defineStore } from 'pinia';
import { Spell } from '@/interfaces/PlayerSpells';
import { trimString } from '@/utils/utils';
import { StoreIds } from '@/constants';

type PlayerSpellsStore = {
	spells: Spell[];
};

export const usePlayerSpellsStore = defineStore(StoreIds.PlayerSpells, {
	state: (): PlayerSpellsStore => ({
		spells: [],
	}),

	actions: {
		setPlayerSpells(spells: Spell[]) {
			this.spells = spells;
		},
		setNewSpell(spell: Spell) {
			this.spells.push(spell);
		},
		removeSpell(spell: Spell) {
			const newState = this.spells.filter(
				(s) => trimString(s.name) !== trimString(spell.name)
			);
			this.spells = newState;
		},
	},

	persist: true,
});
