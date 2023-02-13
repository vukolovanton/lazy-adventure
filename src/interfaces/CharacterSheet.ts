import {CharacterSavingThrowsStore, CharacterSkillsStore} from "@/interfaces/PlayerSkills";

export interface CharacterSheet {
    name: string;
    characterClass: string;
    level: number;
    background: string;
    race: string;
    alignment: string;
    exp: number;
    baseStats: CharacterSheetBaseStats;
    hitPoints: CharacterSheetHitPoints;
    skills: CharacterSheetSkills;
    proficiency: CharacterSheetProficiency;
    savingThrows: CharacterSheetSavingThrows;
    attacks: CharacterSheetAttacks[];
    spells: CharacterSheetSpells[];
}

export interface CharacterSheetStore extends Omit<CharacterSheet, "savingThrows" | "proficiency" | "skills"> {
    savingThrows: CharacterSavingThrowsStore;
    skills: CharacterSkillsStore;
}

export interface CharacterSheetMain {
    userId: number;
    name: string;
    characterClass: string;
    level: number;
    background: string;
    race: string;
    alignment: string;
    exp: number;
}

export interface CharacterSheetBaseStats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    proficiencyBonus: number;
    armorClass: number;
    initiative: number;
    speed: number;
}

export interface CharacterSheetHitPoints {
    hitPointMaximum: number;
    currentHitPoints: number;
    temporaryHitPoints: number;
    hitDice: string;
}

export interface CharacterSheetSkills {
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    sleightOfHand: number;
    stealth: number;
    survival:number;
}

export interface CharacterSheetProficiency {
    acrobatics: boolean;
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleightOfHand: boolean;
    stealth: boolean;
    survival:boolean;
    strength: boolean;
    dexterity: boolean;
    constitution: boolean;
    intelligence: boolean;
    wisdom: boolean;
    charisma: boolean;
}

export interface CharacterSheetSavingThrows {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface CharacterSheetAttacks {
    attackId: number;
    name: string;
    atkBonus: number;
    damage: string;
}

export interface CharacterSheetSpells {
    spellId: number;
    cantrip: boolean;
    spellName: string;
    spellLevel: number;
}
