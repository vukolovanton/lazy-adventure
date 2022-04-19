import { defineStore } from 'pinia';
import { Spell } from '@/interfaces/PlayerSpells';

type PlayerSpellsStore = {
	spells: Spell[];
};

export const usePlayerSpellsStore = defineStore('playerSpells', {
	state: (): PlayerSpellsStore => ({
		spells: [],
	}),

	actions: {
		setNewSpell(spell: Spell) {
			this.spells.push(spell);
		},
		removeSpell(spell: Spell) {
			const newState = this.spells.filter(
				(s) =>
					s.name.split(' ').join('').toLocaleLowerCase() !==
					spell.name.split(' ').join('').toLocaleLowerCase()
			);
			this.spells = newState;
		},
	},
});
