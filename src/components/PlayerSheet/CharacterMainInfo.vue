<template>
	<section class="CharacterMainInfo">
		<TextInputField
			label="Character Name"
			id="name"
			:input-value="name"
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
			label="Alignment"
			id="alignment"
			:input-value="alignment"
			@set-input-value="store.setAlignment"
		/>
<!--		<div class="container">-->
<!--			<select name="select" @change="handleChangeGender" id="gender">-->
<!--				<option :value="g" v-for="g in ['f', 'm']" :selected="g === gender">-->
<!--					{{ g === 'f' ? 'Feemale' : 'Male' }}-->
<!--				</option>-->
<!--			</select>-->
<!--			<label for="characterClass">Gender</label>-->
<!--		</div>-->

		<TextInputField
			label="Level"
			id="level"
			type="number"
			:input-value="level"
			@set-input-value="store.setLevel"
		/>
		<TextInputField
			label="Experience"
			id="exp"
			type="number"
			:input-value="exp"
			@set-input-value="store.setExperience"
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
    characterId,
    userId,
    name,
    characterClass,
    level,
    background,
    race,
    alignment,
    exp
} = storeToRefs(store);

function handleClassChange(e: any) {
	store.setCharacterClass(e.target.value);
	if (characterClass.value) {
//		globalStore.setAvatarSource(
//			getAvatarSource(characterClass.value, gender.value)
//		);
	}
}

//function handleChangeGender(e: any) {
//	store.setGender(e.target.value);
//	globalStore.setAvatarSource(
//		getAvatarSource(characterClass.value, e.target.value)
//	);
//}
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
