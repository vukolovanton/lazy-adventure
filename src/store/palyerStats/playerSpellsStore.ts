import { defineStore } from 'pinia';
import { Spell } from '@/interfaces/PlayerSpells';
import { trimString } from '@/utils/utils';

type PlayerSpellsStore = {
	spells: Spell[];
};

export const usePlayerSpellsStore = defineStore('playerSpells', {
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
});
