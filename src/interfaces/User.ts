import { InventoryItem } from './PlayerInventory';
import { Spell } from './PlayerSpells';

export interface User {
	email: string;
	password: string;
	isDm?: boolean;
}

export interface AuthResponse {
	user: {
		username: string;
		password?: string;
		isAdmin?: boolean;
		id: string;
	};
	token: string;
}

export type SocketResponseData = {
	id: string;
	room: string;
	username: string;
	details: {
		avatarSource: string;
		userId: string;
		stats: {
			characterClass: string;
			level: string;
			initiative: string;
			speed: string;
			currentHitPoints: string;
			maximumHitPoints: string;
			temporaryHitPoints: string;
			hitDice: string;
			inventory: InventoryItem[];
			spells: Spell[];
		};
	};
};

export interface SocketResponse {
	roomUserId: string;
	message: string;
	data: SocketResponseData[];
}
