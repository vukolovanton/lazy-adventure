import {Player} from '@/interfaces/Player';
import axios, {AxiosResponse} from 'axios';
import {errorHandler} from '../utils';
import authHeader from './auth-header';
import {GLOBAL_API_URL} from "@/constants";
import {CharacterSheet, CharacterSheetStore} from "@/interfaces/CharacterSheet";

const API_URL = 'http://localhost:8080/api/character';

class CharacterService {
    saveCharacter(character: CharacterSheet) {
        return axios.patch(API_URL, character, {headers: authHeader()});
    }

    updateCharacter(character: CharacterSheetStore) {
        this.convertStoreModelToApi(character)
//        return axios.put(API_URL, character, {headers: authHeader()});
    }

    fetchCharacterByCharacterId(characterId: string): Promise<AxiosResponse<CharacterSheet> | void> {
        return axios
            .get(GLOBAL_API_URL + '/character' + `/${characterId}`, {headers: authHeader()})
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
            })
            .catch(errorHandler)
    }

    convertStoreModelToApi(character: CharacterSheetStore): CharacterSheet {
        const clone = JSON.parse(JSON.stringify(character));
        delete clone.attacks;
        delete clone.spells;

        
        console.log({clone, character});
    }
}

export default new CharacterService();
