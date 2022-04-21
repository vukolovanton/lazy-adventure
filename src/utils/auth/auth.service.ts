import axios from 'axios';
import { User, AuthResponse } from '@/interfaces/User';
import { useGlobalStore } from '@/store/globalStore';

const API_URL = 'http://localhost:3001/api/v1/users/';

class AuthService {
	login(user: User) {
		return axios
			.post(API_URL + 'login', {
				username: user.username,
				password: user.password,
			})
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data));

					const store = useGlobalStore();
					store.setUsername(response.data.user.username);
					store.setUserId(response.data.user.id);
				}

				return response.data;
			});
	}

	logout() {
		localStorage.removeItem('user');
	}

	register(user: User) {
		return axios
			.post(API_URL + 'register', {
				username: user.username,
				password: user.password,
			})
			.then((response) => {
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data));

					const store = useGlobalStore();
					store.setUsername(response.data.user.username);
					store.setUserId(response.data.user.id);
				}

				return response.data;
			})
			.catch((error) => {
				alert(error);
			});
	}

	getCurrentUser(): AuthResponse | null {
		const user = localStorage.getItem('user');
		if (user) {
			return JSON.parse(user);
		}

		return null;
	}
}

export default new AuthService();
