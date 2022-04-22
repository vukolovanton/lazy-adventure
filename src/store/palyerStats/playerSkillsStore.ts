import { defineStore } from 'pinia';
import {
	PlayerSkillsStore,
	SkillType,
	SkillsList,
	UserFacingSkillsList,
	SkillStoreItem,
} from '@/interfaces/PlayerSkills';

export const usePlayerSkillsStore = defineStore('playerSkills', {
	state: (): PlayerSkillsStore => ({
		skills: [
			{
				name: UserFacingSkillsList.ACROBATICS,
				type: SkillType.DEX,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.ARCANA,
				type: SkillType.INT,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.ATHLETICS,
				type: SkillType.STR,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.DECEPTION,
				type: SkillType.CHA,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.HISTORY,
				type: SkillType.INT,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.INSIGHT,
				type: SkillType.WIS,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.INTIMIDATION,
				type: SkillType.CHA,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.INVESTIGATION,
				type: SkillType.INT,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.MEDICINE,
				type: SkillType.WIS,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.NATURE,
				type: SkillType.INT,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.PERCEPTION,
				type: SkillType.WIS,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.PERFORMANCE,
				type: SkillType.CHA,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.PERSUASION,
				type: SkillType.CHA,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.RELIGION,
				type: SkillType.INT,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.SLEIGHT_OF_HAND,
				type: SkillType.DEX,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.STEALTH,
				type: SkillType.DEX,
				points: 0,
				isLearned: false,
			},
			{
				name: UserFacingSkillsList.SURVIVAL,
				type: SkillType.WIS,
				points: 0,
				isLearned: false,
			},
		],
	}),

	actions: {
		setPlayerSkills(skills: SkillStoreItem[]) {
			this.skills = skills;
		},
		setSkillPoints(skill: UserFacingSkillsList, action: string) {
			const skillIndex = this.skills.findIndex((s) => s.name === skill);
			if (action === '+') {
				this.skills[skillIndex].points++;
			} else if (action === '-') {
				this.skills[skillIndex].points--;
			}
		},
		setIsLearned(skill: UserFacingSkillsList, isLearned: boolean) {
			const skillIndex = this.skills.findIndex((s) => s.name === skill);
			this.skills[skillIndex].isLearned = isLearned;
		},
	},

	persist: true,
});
