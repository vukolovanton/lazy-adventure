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
        await Promise.all([
            this.updateCharacterInfo(clone).catch(onReject),
            this.updateCharacterAttacks(attacks).catch(onReject),
            this.updateCharacterSpells(spells).catch(onReject)
        ]);
    }

    private updateCharacterInfo(character: CharacterSheet) {
        return axios.patch(GLOBAL_API_URL + '/character', character, {headers: authHeader()});
    }

    private updateCharacterAttacks(attacks: CharacterSheetAttacks[]) {
        return axios.patch(GLOBAL_API_URL + '/character/attacks', attacks, {headers: authHeader()});
    }

    private updateCharacterSpells(spells: CharacterSheetSpells[]) {
        return axios.patch(GLOBAL_API_URL + '/character/spells', spells, {headers: authHeader()});
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


        const attacks = updateCharacterDynamicProperty(character.attacks, character.characterId);
        const spells = updateCharacterDynamicProperty(character.spells, character.characterId);

        delete clone.attacks;
        delete clone.spells;

        return {clone, attacks, spells};
    }
}

export default new CharacterService();