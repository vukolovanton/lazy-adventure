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


                    return true;
                }
            }
            return false;
        })
        .catch((e) => alert(e));
    }

	login(user: User) {
        const store = useGlobalStore();

        store.setCharacterName(user.characterName);
        store.setUserId(user.userId);

        localStorage.setItem("user", JSON.stringify({
            characterName: user.characterName,
            userId: user.userId,
        }));
	}

	logout() {
		localStorage.clear();
	}

	getCurrentUserFromLocalStorage(): User | null {
		const user = localStorage.getItem('user');
		if (user) {
			return JSON.parse(user);
		}

		return null;
	}
}

export default new AuthService();
