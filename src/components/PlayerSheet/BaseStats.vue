<template>
	<section class="BaseStats">
		<TextInputField
			type="number"
			label="Strength"
			id="strength"
			:input-value="strength"
			@set-input-value="store.setStength"
		/>
		<TextInputField
			type="number"
			label="Dexterety"
			id="dexterety"
			:input-value="dexterety"
			@set-input-value="store.setDexterety"
		/>
		<TextInputField
			type="number"
			label="Constitution"
			id="constitution"
			:input-value="constitution"
			@set-input-value="store.setConstitution"
		/>
		<TextInputField
			type="number"
			label="Intelligence"
			id="intelligence"
			:input-value="intelligence"
			@set-input-value="store.setIntelligence"
		/>
		<TextInputField
			type="number"
			label="Wisdom"
			id="wisdom"
			:input-value="wisdom"
			@set-input-value="store.setWisdom"
		/>
		<TextInputField
			type="number"
			label="Charisma"
			id="charisma"
			:input-value="charisma"
			@set-input-value="store.setCharisma"
		/>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import TextInputField from '@/components/common/TextInputField.vue';
import { usePlayerBaseStats } from '@/store/palyerStats/playerBaseStatsStore';

const store = usePlayerBaseStats();
const { strength, dexterety, constitution, intelligence, wisdom, charisma } =
	storeToRefs(store);
</script>
