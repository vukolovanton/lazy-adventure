import axios, {AxiosResponse} from 'axios';
import {capitalizeFirstLetterAndTrimSpaces, errorHandler} from '../utils';
import authHeader from './auth-header';
import {GLOBAL_API_URL} from "@/constants";
import {CharacterSheet, CharacterSheetStore} from "@/interfaces/CharacterSheet";


class CharacterService {
    saveCharacter(character: CharacterSheet) {
        return axios.patch(GLOBAL_API_URL + '/character', character, {headers: authHeader()});
    }

    updateCharacter(character: CharacterSheetStore) {
        return axios.patch(GLOBAL_API_URL + '/character', this.convertStoreModelToApi(character), {headers: authHeader()});
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
        delete clone.skills;

        const proficiency = {};
        const skills = {};
        character.skills.forEach(skill => {
            proficiency[capitalizeFirstLetterAndTrimSpaces(skill.name)] = skill.isProficient;
            skills[capitalizeFirstLetterAndTrimSpaces(skill.name)] = skill.points;
        })
        
        proficiency.characterId = clone.characterId;
        skills.characterId = clone.characterId;
        clone.proficiency = proficiency;
        clone.skills = skills;

        const savingThrows = {};
        character.savingThrows.forEach(savingThrow => {
            savingThrows[savingThrow.name] = savingThrow.points;
            proficiency[savingThrow.name] = savingThrow.isProficient;
        })
        savingThrows.characterId = clone.characterId;
        clone.savingThrows = savingThrows;

        return clone;
    }
}

export default new CharacterService();
