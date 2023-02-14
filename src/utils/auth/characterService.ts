import axios, {AxiosResponse} from 'axios';
import {
    lowerFirstLetterAndTrimSpaces,
    errorHandler,
    updateCharacterDynamicProperty,
} from '../utils';
import authHeader from './auth-header';
import {GLOBAL_API_URL} from "@/constants";
import {
    CharacterSheet,
    CharacterSheetStore,
    CharacterSheetAttacks,
    CharacterSheetSpells
} from "@/interfaces/CharacterSheet";

function onReject(err: Error) {
    alert(err)
}

class CharacterService {
    saveCharacter(character: CharacterSheet) {
        return axios.patch(GLOBAL_API_URL + '/character', character, {headers: authHeader()});
    }

    async updateCharacter(character: CharacterSheetStore) {
        const {clone, attacks, spells} = this.convertStoreModelToApi(character);
        clone.attacks = attacks;
        clone.spells = spells;
        
        await Promise.all([
            this.updateCharacterInfo(clone).catch(onReject),
        ]);
    }

    private updateCharacterInfo(character: CharacterSheet) {
        return axios.post(GLOBAL_API_URL + '/character', character, {headers: authHeader()});
    }

    fetchCharacterByCharacterName(characterName: string): Promise<AxiosResponse<CharacterSheet> | void> {
        return axios
            .get(GLOBAL_API_URL + '/character' + `/${characterName}`, {headers: authHeader()})
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
            })
            .catch(errorHandler)
    }

    private convertStoreModelToApi(character: CharacterSheetStore): {
        clone: CharacterSheet,
        attacks: CharacterSheetAttacks[],
        spells: CharacterSheetSpells[]
    } {
        const clone = JSON.parse(JSON.stringify(character));

        const proficiency = {};
        const skills = {};
        character.skills.forEach(skill => {
            skills[lowerFirstLetterAndTrimSpaces(skill.name)] = skill.points;
            proficiency[lowerFirstLetterAndTrimSpaces(skill.name)] = skill.isProficient;
        })

        clone.proficiency = proficiency;
        clone.skills = skills;

        const savingThrows = {};
        character.savingThrows.forEach(savingThrow => {
            savingThrows[savingThrow.name] = savingThrow.points;
            proficiency[savingThrow.name] = savingThrow.isProficient;
        })
        clone.savingThrows = savingThrows;


        const attacks = updateCharacterDynamicProperty(character.attacks);
        const spells = updateCharacterDynamicProperty(character.spells);

        delete clone.attacks;
        delete clone.spells;

        return {clone, attacks, spells};
    }
}

export default new CharacterService();
