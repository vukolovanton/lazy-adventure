<template>
	<section class="BaseInfo">
		<TextInputField
			label="Character Name"
			id="characterName"
			:input-value="characterName"
			@set-input-value="store.setCharacterName"
		/>
		<div class="container">
			<select name="select" @change="handleClassChange" id="characterClass">
				<option
					:value="cl"
					v-for="cl in PlayerClasses"
					:selected="cl === characterClass"
				>
					{{ cl }}
				</option>
			</select>
			<label for="characterClass">Class</label>
		</div>
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
		<IncrementInputField
			label="Level"
			:value="level"
			@set-incrementable-value="updateCharacterLevel"
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
import { useGlobalStore } from '@/store/globalStore';
import { PlayerClasses } from '@/interfaces/PlayerStats';
import { getAvatarSource } from '@/utils/utils';

const store = usePlayerBaseInfo();
const globalStore = useGlobalStore();
const { characterName, characterClass, level, race, aligment, experience } =
	storeToRefs(store);

function handleClassChange(e: any) {
	store.setCharacterClass(e.target.value);
	if (characterClass.value) {
		globalStore.setAvatarSource(getAvatarSource(characterClass.value));
	}
}

function updateCharacterLevel(value: string) {
	if (value === '+') {
		store.incrementLevel();
	} else if (value === '-') {
		store.decrementLevel();
	}
}
</script>

<style scoped>
.BaseInfo {
	grid-area: BaseInfo;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}

.container {
	display: flex;
	flex-direction: column;
	margin-bottom: 1em;
	max-width: 10em;
}
</style>
