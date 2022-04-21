<template>
	<section class="SpellsList">
		<h3>Spells</h3>
		<div v-for="spell in spells" class="spells-list">
			<span>{{ spell.name }}</span>
			<span>{{ spell.attack }}</span>
			<span>{{ spell.dice }}</span>
			<span>{{ spell.type }}</span>
			<button @click="store.removeSpell(spell)">X</button>
		</div>
		<div class="spells-input">
			<SmallTextInput
				label="Name"
				id="spellName"
				:input-value="newSpell.name"
				@set-input-value="setSpellName"
			/>
			<SmallTextInput
				label="Attack"
				id="spellAttack"
				:input-value="newSpell.attack"
				@set-input-value="setSpellAttack"
			/>
			<SmallTextInput
				label="Dice"
				id="spellDice"
				:input-value="newSpell.dice"
				@set-input-value="setSpellDice"
			/>
			<SmallTextInput
				label="Type"
				id="spellType"
				:input-value="newSpell.type"
				@set-input-value="setSpellType"
			/>
		</div>
		<button @click="handleSaveNewSpell" :disabled="!isFilled">Add</button>
	</section>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import SmallTextInput from '@/components/common/SmallTextInput.vue';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';

const store = usePlayerSpellsStore();
const { spells } = storeToRefs(store);
const newSpell = reactive({
	name: '',
	attack: 0,
	dice: '',
	type: '',
});

const isFilled = computed(() => {
	return (
		newSpell.attack > 0 &&
		newSpell.name.trim() !== '' &&
		newSpell.dice.trim() !== '' &&
		newSpell.type.trim() !== ''
	);
});

function handleRemove() {
	store.removeSpell(newSpell);
}

function setSpellName(value: string) {
	newSpell.name = value;
}

function setSpellAttack(value: string) {
	newSpell.attack = Number(value);
}

function setSpellDice(value: string) {
	newSpell.dice = value;
}

function setSpellType(value: string) {
	newSpell.type = value;
}

function handleSaveNewSpell() {
	if (!isFilled) return;

	const t = { ...newSpell };
	store.setNewSpell(t);

	newSpell.name = '';
	newSpell.attack = 0;
	newSpell.dice = '';
	newSpell.type = '';
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
