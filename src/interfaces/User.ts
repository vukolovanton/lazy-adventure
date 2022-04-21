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
