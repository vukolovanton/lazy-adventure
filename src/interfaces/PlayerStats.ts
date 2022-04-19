export interface PlayerBaseInfo {
	characterName: string;
	characterClass: string;
	level: number;
	race: string;
	aligment: string;
	experience: number;
}

export interface PlayerAdditionalInfo {
	armorClass: number;
	initiative: number;
	speed: number;
	currentHitPoints: number;
	maximumHitPoints: number;
	temporaryHitPoints: number;
	hitDice: number;
	deathSaves: boolean[][];
}

export interface PlayerBaseStats {
	strength: number;
	dexterety: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
}
