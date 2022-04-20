<template>
	<section class="SkillList">
		<div class="filter">
			<input
				type="radio"
				id="all"
				name="spells"
				value="all"
				:checked="filter === 'all'"
				@change="filter = 'all'"
			/>
			<label for="all">All</label>

			<input
				type="radio"
				id="learned"
				name="spells"
				value="learned"
				:checked="filter === 'learned'"
				@change="filter = 'learned'"
			/>
			<label for="learned">Learned</label>
		</div>
		<div v-for="skill in filteredSkills" class="skills-container">
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
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';

const store = usePlayerSkillsStore();
const { skills } = storeToRefs(store);

const filter = ref('all');
const filteredSkills = computed(() => {
	if (filter.value === 'all') {
		return skills.value;
	}

	return skills.value.filter((skill) => skill.isLearned);
});
</script>

<style lang="scss" scoped>
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
