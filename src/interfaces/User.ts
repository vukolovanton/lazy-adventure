export interface User {
	characterName: string;
	isDm?: boolean;
    userId: number;
}

export interface AuthResponse {
    email: string;
    password: string;
    userId: number;
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
			attacks: unknown[];
			spells: unknown[];
		};
	};
};

export interface SocketResponse {
	roomUserId: string;
	message: string;
	data: SocketResponseData[];
}
