import { defineStore } from 'pinia';
import { PlayerBaseInfo } from '@/interfaces/PlayerStats';
import { StoreIds } from '@/constants';
import {CharacterSheet, CharacterSheetMain} from "@/interfaces/CharacterSheet";

export const useCharacterMainInfo = defineStore(StoreIds.PlayerBaseInfo, {
    state: (): CharacterSheetMain => {
		return {
            characterId: 0,
            userId: 0,
			name: '',
			characterClass: '',
			level: 0,
            background: '',
			race: '',
            alignment: '',
            exp: 0,
		};
	},

	actions: {
        setCharacterMainInfo(character: CharacterSheet) {
            this.name = character.name;
            this.characterId = character.characterId;
            this.userId = character.userId;
            this.name = character.name;
            this.characterClass = character.characterClass;
            this.level = character.level;
            this.background = character.background;
            this.race = character.race;
            this.alignment = character.alignment;
            this.exp = character.exp;
		},
		setCharacterName(name: string) {
            this.name = name;
		},
        setCharacterId(characterId: number) {
            this.characterId = characterId;
        },
        setUserId(userId: number) {
            this.userId = userId;
        },
        setCharacterClass(characterClass: string) {
            this.characterClass = characterClass;
        },
        setLevel(level: number) {
            this.level = level;
        },
        setBackground(background: string) {
            this.background = background;
        },
        setRace(race: string) {
            this.race = race;
        },
        setAlignment(alignment: string) {
            this.alignment = alignment;
        },
        setExp(exp: number) {
            this.exp = exp;
        }
	},

	persist: true,
});
