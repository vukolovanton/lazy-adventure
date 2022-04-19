<template>
	<section>
		<div v-for="spell in spells">
			<span>{{ spell.name }}</span>
			<span>{{ spell.attack }}</span>
			<span>{{ spell.dice }}</span>
			<span>{{ spell.type }}</span>
		</div>
		<div>
			<TextInputField
				label="Name"
				id="spellName"
				:input-value="newSpell.name"
				@set-input-value="setSpellName"
			/>
			<TextInputField
				label="Attack"
				id="spellAttack"
				:input-value="newSpell.attack"
				@set-input-value="setSpellAttack"
			/>
			<TextInputField
				label="Dice"
				id="spellDice"
				:input-value="newSpell.dice"
				@set-input-value="setSpellDice"
			/>
			<TextInputField
				label="Type"
				id="spellType"
				:input-value="newSpell.type"
				@set-input-value="setSpellType"
			/>
			<button @click="handleSaveNewSpell">Add</button>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';
import TextInputField from '@/components/common/TextInputField.vue';
import { reactive } from 'vue';

const store = usePlayerSpellsStore();
const { spells } = storeToRefs(store);
const newSpell = reactive({
	name: '',
	attack: 0,
	dice: '',
	type: '',
});

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
	const t = { ...newSpell };
	store.setNewSpell(t);

	newSpell.name = '';
	newSpell.attack = 0;
	newSpell.dice = '';
	newSpell.type = '';
}
</script>
