<template>
	<section class="SpellsList">
		<h3>Spells</h3>
		<div v-for="spell in spells" class="spells-list">
			<span>{{ spell.spellLevel }}</span>
			<span>{{ spell.spellName }}</span>
			<button @click="store.removeSpell(spell)">X</button>
		</div>
		<div class="spells-input">
			<SmallTextInput
				label="Spell Level"
				id="spellLevel"
				:input-value="newSpell.spellLevel"
				@set-input-value="setSpellLevel"
			/>
			<SmallTextInput
				label="Spell Name"
				id="spellName"
				:input-value="newSpell.name"
				@set-input-value="setSpellName"
			/>
		</div>
		<button @click="handleSaveNewSpell" :disabled="!isFilled">Add</button>
	</section>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import SmallTextInput from '@/components/common/SmallTextInput.vue';
import {useCharacterSpellsStore} from "@/store/palyerStats/characterSpellsStore";

const store = useCharacterSpellsStore();
const { spells } = storeToRefs(store);
const newSpell = reactive({
	spellName: '',
    spellLevel: 0,
});

const isFilled = computed(() => {
	return (
		newSpell.spellLevel > 0 &&
		newSpell.spellName.trim() !== ''
	);
});

function setSpellName(value: string) {
	newSpell.spellName = value;
}

function setSpellLevel(value: string) {
	newSpell.spellLevel = Number(value);
}

function handleSaveNewSpell() {
	if (!isFilled) return;

	const t = { ...newSpell };
	store.setNewSpell(t);

	newSpell.spellName = '';
	newSpell.spellLevel = 0;
}
</script>

<style lang="scss" scoped>
h3 {
	margin-bottom: 1em;
}

.spells-list {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1em;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
}
.spells-input {
	display: flex;
	justify-content: space-between;
}
</style>
