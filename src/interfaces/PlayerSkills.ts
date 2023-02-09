interface Skill {
	points: number;
	isLearned: boolean;
	name: UserFacingSkillsList;
}

interface StrSkill extends Skill {
	type: SkillType.STR;
}

interface DexSkill extends Skill {
	type: SkillType.DEX;
}

interface ConSkill extends Skill {
	type: SkillType.CON;
}

interface IntSkill extends Skill {
	type: SkillType.INT;
}

interface WisSkill extends Skill {
	type: SkillType.WIS;
}

interface ChaSkill extends Skill {
	type: SkillType.CHA;
}

export interface Acrobatics extends DexSkill {}
export interface Arcana extends IntSkill {}
export interface Athletics extends StrSkill {}
export interface Deception extends ChaSkill {}
export interface History extends IntSkill {}
export interface Insight extends WisSkill {}
export interface Intimidation extends ChaSkill {}
export interface Investigation extends IntSkill {}
export interface Medicine extends WisSkill {}
export interface Nature extends IntSkill {}
export interface Perception extends WisSkill {}
export interface Performance extends ChaSkill {}
export interface Persuasion extends ChaSkill {}
export interface Religion extends IntSkill {}
export interface SleightOfHand extends DexSkill {}
export interface Stealth extends DexSkill {}
export interface Survival extends WisSkill {}

export type SkillStoreItem = {
    name: typeof UserFacingSkillsListObject;
	type: SkillType;
	points: number;
	isLearned: boolean;
};

export type SavingThrowStoreItem = {
    name: string;
    points: number;
    isProficient: boolean;
};

export interface CharacterSkillsStore {
	skills: SkillStoreItem[];
}

export interface CharacterSavingThrowsStore {
    savingThrows: SavingThrowStoreItem[];
}

export enum SkillType {
	STR = 'str',
	DEX = 'dex',
	CON = 'con',
	INT = 'int',
	WIS = 'wis',
	CHA = 'cha',
}

export enum SkillsList {
	ACROBATICS = 'acrobatics',
	ARCANA = 'arcana',
	ATHLETICS = 'athletics',
	DECEPTION = 'deception',
	HISTORY = 'history',
	INSIGHT = 'insight',
	INTIMIDATION = 'intimidation',
	INVESTIGATION = 'investigation',
	MEDICINE = 'medicine',
	NATURE = 'nature',
	PERCEPTION = 'perception',
	PERFORMANCE = 'performance',
	PERSUASION = 'persuasion',
	RELIGION = 'religion',
	SLEIGHT_OF_HAND = 'sleightOfHand',
	STEALTH = 'stealth',
	SURVIVAL = 'survival',
}

export enum UserFacingSkillsList {
	ACROBATICS = 'Acrobatics',
	ARCANA = 'Arcana',
	ATHLETICS = 'Athletics',
	DECEPTION = 'Deception',
	HISTORY = 'History',
	INSIGHT = 'Insight',
	INTIMIDATION = 'Intimidation',
	INVESTIGATION = 'Investigation',
	MEDICINE = 'Medicine',
	NATURE = 'Nature',
	PERCEPTION = 'Perception',
	PERFORMANCE = 'Performance',
	PERSUASION = 'Persuasion',
	RELIGION = 'Religion',
	SLEIGHT_OF_HAND = 'Sleight Of Hand',
	STEALTH = 'Stealth',
	SURVIVAL = 'Survival',
}

export const UserFacingSkillsListObject = {
    [SkillsList.ACROBATICS]: 'Acrobatics',
    [SkillsList.ARCANA]: 'Arcana',
    [SkillsList.ATHLETICS]: 'Athletics',
    [SkillsList.DECEPTION]: 'Deception',
    [SkillsList.HISTORY]: 'History',
    [SkillsList.INSIGHT]: 'Insight',
    [SkillsList.INTIMIDATION]: 'Intimidation',
    [SkillsList.INVESTIGATION]: 'Investigation',
    [SkillsList.MEDICINE]: 'Medicine',
    [SkillsList.NATURE]: 'Nature',
    [SkillsList.PERCEPTION]: 'Perception',
    [SkillsList.PERFORMANCE]: 'Performance',
    [SkillsList.PERSUASION]: 'Persuasion',
    [SkillsList.RELIGION]: 'Religion',
    [SkillsList.SLEIGHT_OF_HAND]: 'Sleight Of Hand',
    [SkillsList.STEALTH]: 'Stealth',
    [SkillsList.SURVIVAL]: 'Survival',
}