import {Player} from '@/interfaces/Player';
import axios, {AxiosResponse} from 'axios';
import {errorHandler} from '../utils';
import authHeader from './auth-header';
import {GLOBAL_API_URL} from "@/constants";
import {CharacterSheet} from "@/interfaces/CharacterSheet";

const API_URL = 'http://localhost:3001/api/v1/';

class PlayerService {
    savePlayer(player: Player) {
        return axios.post(API_URL + 'player', player, {headers: authHeader()});
    }

    updatePlayer(player: Player) {
        return axios.put(API_URL + 'player', player, {headers: authHeader()});
    }

//	fetchPlayer(id: string): Promise<Player> {
//		return axios
//			.get(API_URL + 'player/' + id, { headers: authHeader() })
//			.then((response) => response.data)
//			.catch(errorHandler);
//	}

    fetchCharacterSheet(characterId: string): Promise<AxiosResponse<CharacterSheet> | void> {
        return axios
            .get(GLOBAL_API_URL + '/character' + `/${characterId}`, {headers: authHeader()})
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
            })
            .catch(errorHandler)
    }
}

export default new PlayerService();
