<template>
	<section class="CharacterMainInfo">
		<TextInputField
			label="Name"
			id="name"
			:inputValue="name"
            :disabled="true"
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
			:inputValue="race"
            @update:inputValue="store.setRace"
		/>
		<TextInputField
			label="Alignment"
			id="alignment"
			:inputValue="alignment"
			@update:inputValue="store.setAlignment"
		/>
		<div class="container">
			<select name="select" @change="handleChangeGender" id="gender">
				<option :value="g" v-for="g in ['f', 'm']" :selected="g === gender">
					{{ g === 'f' ? 'Feemale' : 'Male' }}
				</option>
			</select>
			<label for="characterClass">Gender</label>
		</div>

		<TextInputField
			label="Level"
			id="level"
			type="number"
			:inputValue="level"
			@update:inputValue="store.setLevel"
		/>
		<TextInputField
			label="Experience"
			id="exp"
			type="number"
			:inputValue="exp"
			@update:inputValue="store.setExp"
		/>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import TextInputField from '@/components/common/TextInputField.vue';
import { useCharacterMainInfo } from '@/store/palyerStats/characterMainInfoStore';
import { useGlobalStore } from '@/store/globalStore';
import { PlayerClasses } from '@/interfaces/PlayerStats';
import { getAvatarSource } from '@/utils/utils';

const store = useCharacterMainInfo();
const globalStore = useGlobalStore();
const {
    name,
    characterClass,
    level,
    background,
    race,
    alignment,
    exp,
    gender
} = storeToRefs(store);

function handleClassChange(e: any) {
	store.setCharacterClass(e.target.value);
	if (characterClass.value) {
		globalStore.setAvatarSource(
			getAvatarSource(characterClass.value, gender.value)
		);
	}
}

function handleChangeGender(e: any) {
	store.setGender(e.target.value);
	globalStore.setAvatarSource(
		getAvatarSource(characterClass.value, e.target.value)
	);
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
