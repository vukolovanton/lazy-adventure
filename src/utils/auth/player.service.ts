import { Player } from '@/interfaces/Player';
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/v1/';

class PlayerService {
	savePlayer(player: Player) {
		return axios.post(API_URL + 'player', player, { headers: authHeader() });
	}

	updatePlayer(player: Player) {
		return axios.put(API_URL + 'player', player, { headers: authHeader() });
	}

	fetchPlayer(id: string): Promise<Player> {
		return axios
			.get(API_URL + 'player/' + id, { headers: authHeader() })
			.then((response) => response.data)
			.catch((e) => alert(e));
	}

	// getModeratorBoard() {
	// 	return axios.get(API_URL + 'mod', { headers: authHeader() });
	// }
}

export default new PlayerService();
