import {defineStore} from 'pinia';
import {
    CharacterSkillsStore,
    SkillStoreItem,
    SkillType,
    UserFacingSkillsListObject,
} from '@/interfaces/PlayerSkills';
import {StoreIds} from '@/constants';
import {CharacterSheetProficiency, CharacterSheetSkills} from "@/interfaces/CharacterSheet";

export const useCharacterSkillsStore = defineStore(StoreIds.PlayerSkills, {
	state: (): CharacterSkillsStore => ({
		skills: [],
	}),

	actions: {
		setPlayerSkills(skills: CharacterSheetSkills, proficiency: CharacterSheetProficiency) {
            const result: SkillStoreItem[] = [];

            Object.entries(skills).forEach(skill => {
                const skillName= skill[0];
                const skillValue= skill[1];
                const skillProficiency = proficiency[skillName];

                if (skillName !== 'characterId') {
                    result.push({
                        name: UserFacingSkillsListObject[skillName],
                        type: SkillType.CHA,
                        points: skillValue,
                        isProficient: skillProficiency
                    } as SkillStoreItem)
                }
            })
			this.skills = result;
		},
        setSkillPoints(skill: typeof UserFacingSkillsListObject, action: string) {
            const index = this.skills.findIndex((s) => s.name === skill);
			if (action === '+') {
                this.skills[index].points++;
			} else if (action === '-') {
                this.skills[index].points--;
			}
		},
        setIsProficient(skill: typeof UserFacingSkillsListObject, isProficient: boolean) {
			const skillIndex = this.skills.findIndex((s) => s.name === skill);
            this.skills[skillIndex].isProficient = isProficient;
		},
	},

	persist: true,
});
