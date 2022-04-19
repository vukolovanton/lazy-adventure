<template>
	<section>
		<div v-for="skill in skills">
			<input
				type="checkbox"
				:id="skill.name"
				:checked="skill.isLearned"
				@change="store.setIsLearned(skill.name, $event.target?.checked)"
			/>
			<label :for="skill.name">{{ skill.name }}</label>
			<span>{{ skill.points }}</span>
			<div>
				<button @click="store.setSkillPoints(skill.name, '-')">-</button>
				<button @click="store.setSkillPoints(skill.name, '+')">+</button>
			</div>
			<span>({{ skill.type }})</span>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';

const store = usePlayerSkillsStore();
const { skills } = storeToRefs(store);
</script>
