<template>
	<section class="SkillList">
		<div class="filter">
            <TextInputField
                    type="number"
                    label="Proficiency Bonus"
                    id="proficiencyBonus"
                    :inputValue="proficiencyBonus"
                    @update:inputValue="characterBaseStatsStore.setProficiencyBonus"
            />
		</div>
		<div v-for="skill in skills" class="skills-container">
			<input
				type="checkbox"
				:id="skill.name"
				:checked="skill.isProficient"
				@change="store.setIsProficient(skill.name, $event.target?.checked)"
			/>
			<label :for="skill.name">{{ skill.name }}</label>
			<div class="skills-controlls">
				<span>{{ skill.points }}</span>
				<div>
					<button @click="store.setSkillPoints(skill.name, '-')">-</button>
					<button @click="store.setSkillPoints(skill.name, '+')">+</button>
				</div>
				<span>({{ skill.type }})</span>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCharacterSkillsStore } from '@/store/palyerStats/characterSkillsStore';
import { useCharacterBaseStatsStore } from '@/store/palyerStats/characterBaseStatsStore';
import TextInputField from "@/components/common/TextInputField.vue";

const characterBaseStatsStore = useCharacterBaseStatsStore();
const store = useCharacterSkillsStore();
const { skills } = storeToRefs(store);

const { proficiencyBonus } = storeToRefs(characterBaseStatsStore);

</script>

<style lang="scss" scoped>
.SkillList {
	grid-area: SkillList;
	justify-self: stretch;
}
.filter {
	margin-bottom: 1em;
}
.skills-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.skills-controlls {
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > span:first-child {
		padding: 0 0.7em;
		font-weight: bold;
	}

	& > span:last-child {
		padding: 0 0.7em;
		font-size: 0.8em;
		opacity: 0.5;
	}
}
</style>
