import {PlayerClasses} from "@/interfaces/PlayerStats";

export const SOCKET_IO_URL = 'http://localhost:3002';
export const GLOBAL_API_URL = 'http://localhost:3001/api'
export const SOCKET_IO_ROOM_NAME = 'dev';
export const GRID_SIZE = {
	WIDTH: 864,
	HEIGHT: 514,
	TILE: 32,
};

export enum StoreIds {
	GlobalStore = 'GlobalStore',
	PlayerAdditionalInfo = 'PlayerAdditionalInfo',
	PlayerBaseInfo = 'PlayerBaseInfo',
	PlayerBaseStats = 'PlayerBaseStats',
	PlayerInventory = 'PlayerInventory',
	PlayerSkills = 'PlayerSkills',
	PlayerSpells = 'PlayerSpells',
    CharacterSkills = 'CharacterSkills',
    CharacterHitPoints = 'CharacterHitPoints',
    CharacterSavingThrows = 'CharacterSavingThrows',
    CharacterAttacks = 'CharacterAttacks',
    CharacterSpells = 'CharacterSpells',
}

export const GET_DEFAULT_CHARACTER = (name: string, userId: number) => ({
    name: name,
    userId: userId,
    gender: 'm',
    characterClass: PlayerClasses.Wizard,
    level: 1,
    background: "none",
    race: "human",
    alignment: "haotic",
    exp: 100,
    baseStats: {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
        proficiencyBonus: 1,
        armorClass: 1,
        initiative: 1,
        speed: 1
    },
    hitPoints: {
        hitPointMaximum: 10,
        currentHitPoints: 10,
        temporaryHitPoints: 10,
        hitDice: "1d6"
    },
    skills: {
        acrobatics: 0,
        animalHandling: 0,
        arcana: 0,
        athletics: 0,
        deception: 0,
        history: 0,
        insight: 0,
        intimidation: 0,
        investigation: 0,
        medicine: 0,
        nature: 0,
        perception: 0,
        performance: 0,
        persuasion: 0,
        religion: 0,
        sleightOfHand: 0,
        stealth: 0,
        survival: 0
    },
    savingThrows: {
        strength0: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    },
    proficiency: {
        acrobatics: false,
        animalHandling: false,
        arcana: false,
        athletics: false,
        deception: false,
        history: false,
        insight: false,
        intimidation: false,
        investigation: false,
        medicine: false,
        nature: false,
        perception: false,
        performance: false,
        persuasion: false,
        religion: false,
        sleightOfHand: false,
        stealth: false,
        survival: false
    },
    attacks: [],
    spells: []
})
