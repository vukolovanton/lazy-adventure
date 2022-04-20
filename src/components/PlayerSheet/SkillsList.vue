<template>
	<section class="SkillList">
		<div v-for="skill in skills" class="skills-container">
			<input
				type="checkbox"
				:id="skill.name"
				:checked="skill.isLearned"
				@change="store.setIsLearned(skill.name, $event.target?.checked)"
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
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';

const store = usePlayerSkillsStore();
const { skills } = storeToRefs(store);
</script>

<style lang="scss" scoped>
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
