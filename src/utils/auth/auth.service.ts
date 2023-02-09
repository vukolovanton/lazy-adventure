import axios from 'axios';
import { User, AuthResponse } from '@/interfaces/User';
import { useGlobalStore } from '@/store/globalStore';
import authHeader from "@/utils/auth/auth-header";

const API_URL_REGISTER = 'http://localhost:8080/api/auth/register/';
const API_URL_LOGIN = 'http://localhost:8080/api/auth/login/';
const USER_INFO_URL = 'http://localhost:8080/api/user/info/';

class AuthService {
    getUserInfo() {
        return axios
        .get(USER_INFO_URL, { headers: authHeader() })
        .then((response) => {
            if (response) {
                if (response.data) {
                    const store = useGlobalStore();
                    store.setUsername(response.data.email);
                    store.setUserId(response.data.userId);
                    
                    localStorage.setItem("user", JSON.stringify({
                        username: response.data.email,
                        password: response.data.password,
                        id: response.data.userId,
                    }))

                    return true;
                }
            }
            return false;
        })
        .catch((e) => alert(e));
    }

	login(user: User) {
		return axios
			.post(API_URL_LOGIN, {
				email: user.email,
				password: user.password,
			})
			.then((response) => {
				if (response.data.jwtToken) {
                    localStorage.setItem('token', JSON.stringify(response.data.jwtToken));

				}
				return response.data;
			})
			.catch((e) => alert(e));
	}

	logout() {
		localStorage.clear();
	}

	register(user: User) {
		return axios
			.post(API_URL_REGISTER + 'register', {
				email: user.email,
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
