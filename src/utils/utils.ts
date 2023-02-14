import { PlayerClasses } from '@/interfaces/PlayerStats';
import { AxiosError } from 'axios';

export function trimString(str: string) {
	return str.split(' ').join('').toLocaleLowerCase();
}

export function lowerFirstLetterAndTrimSpaces(string: string) {
    const t = string.charAt(0).toLowerCase() + string.slice(1);
    return t.replace(/ +/g, "");
}

export function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function errorHandler(e: AxiosError) {
	if (e.message === 'Request failed with status code 401') {
		alert(e + '\n\nPlease log in again.');
	}
}

export function getAvatarSource(playerClass: string, gender: 'f' | 'm') {
	switch (playerClass) {
		case PlayerClasses.Wizard:
			return `/characters/wizard-${gender}.png`;
		case PlayerClasses.Druid:
			return `/characters/druid-${gender}.png`;
		case PlayerClasses.Sorcerer:
			return `/characters/sorcerer-${gender}.png`;
		case PlayerClasses.Warlock:
			return `/characters/warlock-${gender}.png`;
		case PlayerClasses.Ranger:
			return `/characters/ranger-${gender}.png`;
		case PlayerClasses.Rouge:
			return `/characters/rouge-${gender}.png`;
		case PlayerClasses.Monk:
			return `/characters/monk-${gender}.png`;
		case PlayerClasses.Bard:
			return `/characters/bard-${gender}.png`;
		case PlayerClasses.Barbarian:
			return `/characters/barbarian-${gender}.png`;
		case PlayerClasses.Paladin:
			return `/characters/paladin-${gender}.png`;
		case PlayerClasses.Fighter:
			return `/characters/fighter-${gender}.png`;
		case PlayerClasses.Cleric:
			return `/characters/cleric-${gender}.png`;

		default:
			return '';
	}
}

export function updateCharacterDynamicProperty<T>(items: T[]): T[] {
    const updated: T | [] = [];
    items.forEach(item => {
        updated.push({
            ...item,
        })
    });
    return updated;
}
