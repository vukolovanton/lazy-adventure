<template>
	<section>
		<TextInputField
			label="Character Name"
			id="characterName"
			:input-value="characterName"
			@set-input-value="store.setCharacterName"
		/>
		<TextInputField
			label="Class"
			id="characterClass"
			:input-value="characterClass"
			@set-input-value="store.setCharacterClass"
		/>
		<IncrementInputField
			label="Level"
			:value="level"
			@set-incrementable-value="updateCharacterLevel"
		/>
		<TextInputField
			label="Race"
			id="race"
			:input-value="race"
			@set-input-value="store.setRace"
		/>
		<TextInputField
			label="Aligment"
			id="aligment"
			:input-value="aligment"
			@set-input-value="store.setAligment"
		/>
		<TextInputField
			label="Experience"
			id="experience"
			type="number"
			:input-value="experience"
			@set-input-value="store.setExperience"
		/>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import TextInputField from '@/components/common/TextInputField.vue';
import IncrementInputField from '@/components/common/IncrementInputField.vue';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';

const store = usePlayerBaseInfo();
const { characterName, characterClass, level, race, aligment, experience } =
	storeToRefs(store);

function updateCharacterLevel(value: string) {
	if (value === '+') {
		store.incrementLevel();
	} else if (value === '-') {
		store.decrementLevel();
	}
}
</script>
