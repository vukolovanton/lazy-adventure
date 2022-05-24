import { PlayerClasses } from '@/interfaces/PlayerStats';
import { AxiosError } from 'axios';

export function trimString(str: string) {
	return str.split(' ').join('').toLocaleLowerCase();
}

export function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function errorHandler(e: AxiosError) {
	console.log(e.message);
	if (e.message === 'Request failed with status code 401') {
		alert(e + '\n\nPlease log in again.');
	}
}

export function getAvatarSource(playerClass: string) {
	switch (playerClass) {
		case PlayerClasses.Wizard:
			return 'src/assets/characters/wizard-m.png';
			break;
		case PlayerClasses.Druid:
			return 'src/assets/characters/druid-m.png';
			break;
		case PlayerClasses.Sorceror:
			return 'src/assets/characters/sorceror-m.png';
			break;
		case PlayerClasses.Warlock:
			return 'src/assets/characters/warlock-m.png';
			break;
		case PlayerClasses.Ranger:
			return 'src/assets/characters/ranger-m.png';
			break;
		case PlayerClasses.Rouge:
			return 'src/assets/characters/rouge-m.png';
			break;
		case PlayerClasses.Monk:
			return 'src/assets/characters/monk-m.png';
			break;
		case PlayerClasses.Bard:
			return 'src/assets/characters/bard-m.png';
			break;
		case PlayerClasses.Barbarian:
			return 'src/assets/characters/barbarian-m.png';
			break;
		case PlayerClasses.Paladin:
			return 'src/assets/characters/paladin-m.png';
			break;
		case PlayerClasses.Fighter:
			return 'src/assets/characters/fighter-m.png';
			break;
		case PlayerClasses.Cleric:
			return 'src/assets/characters/cleric-m.png';
			break;

		default:
			return '';
			break;
	}
}
