import { defineStore } from 'pinia';
import { StoreIds } from '@/constants';
import {CharacterSheet, CharacterSheetBaseStats} from "@/interfaces/CharacterSheet";

export const useCharacterBaseStatsStore = defineStore(
	StoreIds.PlayerAdditionalInfo,
	{
		state: (): CharacterSheetBaseStats => ({
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            proficiencyBonus: 0,
            armorClass: 0,
            initiative: 0,
            speed: 0,
		}),

		actions: {
			setCharacterBaseStats(character: CharacterSheet) {
                this.strength = character.baseStats.strength;
                this.dexterity = character.baseStats.dexterity;
                this.constitution = character.baseStats.constitution;
                this.intelligence = character.baseStats.intelligence;
                this.wisdom = character.baseStats.wisdom;
                this.charisma = character.baseStats.charisma;
                this.proficiencyBonus = character.baseStats.proficiencyBonus;
                this.armorClass = character.baseStats.armorClass;
                this.initiative = character.baseStats.initiative;
                this.speed = character.baseStats.speed;
			},
            setStrength(strength: number) {
                this.strength = strength;
            },
            setDexterity(dex: number) {
                this.dexterity = dex;
            },
            setConstitution(con: number) {
                this.constitution = con;
            },
            setIntelligence(int: number) {
                this.intelligence = int;
            },
            setWisdom(wis: number) {
                this.wisdom = wis;
            },
            setCharisma(char: number) {
                this.charisma = char;
            },
            setProficiencyBonus(prof: number) {
                this.proficiencyBonus = prof;
            },
			setArmorClass(armorClass: number) {
				this.armorClass = armorClass;
			},
            setInitiative(initiative: number) {
                this.initiative = initiative;
            },
            setSpeed(speed: number) {
                this.speed = speed;
            }
		},

		persist: true,
	}
);
