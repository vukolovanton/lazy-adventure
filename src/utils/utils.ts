import { PlayerClasses } from '@/interfaces/PlayerStats';
import { AxiosError } from 'axios';

export function trimString(str: string) {
	return str.split(' ').join('').toLocaleLowerCase();
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
			return `src/assets/characters/wizard-${gender}.png`;
		case PlayerClasses.Druid:
			return `src/assets/characters/druid-${gender}.png`;
		case PlayerClasses.Sorcerer:
			return `src/assets/characters/sorcerer-${gender}.png`;
		case PlayerClasses.Warlock:
			return `src/assets/characters/warlock-${gender}.png`;
		case PlayerClasses.Ranger:
			return `src/assets/characters/ranger-${gender}.png`;
		case PlayerClasses.Rouge:
			return `src/assets/characters/rouge-${gender}.png`;
		case PlayerClasses.Monk:
			return `src/assets/characters/monk-${gender}.png`;
		case PlayerClasses.Bard:
			return `src/assets/characters/bard-${gender}.png`;
		case PlayerClasses.Barbarian:
			return `src/assets/characters/barbarian-${gender}.png`;
		case PlayerClasses.Paladin:
			return `src/assets/characters/paladin-${gender}.png`;
		case PlayerClasses.Fighter:
			return `src/assets/characters/fighter-${gender}.png`;
		case PlayerClasses.Cleric:
			return `src/assets/characters/cleric-${gender}.png`;

		default:
			return '';
			break;
	}
}
