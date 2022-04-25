export interface User {
	username: string;
	password: string;
	isAdmin?: boolean;
}

export interface AuthResponse {
	id: string;
	user: {
		username: string;
		password?: string;
		isAdmin?: boolean;
		id?: string;
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
	};
};

export interface SocketResponse {
	roomUserId: string;
	message: string;
	data: SocketResponseData[];
}
