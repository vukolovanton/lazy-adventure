<template>
	<section class="BaseStats">
		<TextInputField
			type="number"
			label="Strength"
			id="strength"
			:inputValue="strength"
			@update:inputValue="store.setStrength"
		/>
		<TextInputField
			type="number"
			label="Dexterity"
			id="dexterity"
			:inputValue="dexterity"
			@update:inputValue="store.setDexterity"
		/>
		<TextInputField
			type="number"
			label="Constitution"
			id="constitution"
			:inputValue="constitution"
			@update:inputValue="store.setConstitution"
		/>
		<TextInputField
			type="number"
			label="Intelligence"
			id="intelligence"
			:inputValue="intelligence"
			@update:inputValue="store.setIntelligence"
		/>
		<TextInputField
			type="number"
			label="Wisdom"
			id="wisdom"
			:inputValue="wisdom"
			@update:inputValue="store.setWisdom"
		/>
		<TextInputField
			type="number"
			label="Charisma"
			id="charisma"
			:inputValue="charisma"
			@update:inputValue="store.setCharisma"
		/>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import TextInputField from '@/components/common/TextInputField.vue';
import {useCharacterBaseStatsStore} from "@/store/palyerStats/characterBaseStatsStore";

const store = useCharacterBaseStatsStore();
const {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
} = storeToRefs(store);
</script>
