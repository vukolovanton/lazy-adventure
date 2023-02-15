<template>
	<section class="Attacks">
		<h3>Attacks & Spellcasting</h3>
		<div v-for="attack in attacks" class="attacks-list">
			<span>{{ attack.name }}</span>
			<span>{{ attack.damage }}</span>
			<span>{{ attack.atkBonus }}</span>
			<button @click="store.removeCharacterAttack(attack)">X</button>
		</div>
		<div class="attacks-input">
			<SmallTextInput
				label="Name"
				id="name"
				:inputValue="newAttack.name"
				@update:inputValue="setAttackName"
			/>
			<SmallTextInput
				label="Damage"
				id="damage"
				:inputValue="newAttack.damage"
				@update:inputValue="setAttackDamage"
			/>
			<SmallTextInput
				label="Atk Bonus"
				id="aktBonus"
				:inputValue="newAttack.atkBonus"
				@update:inputValue="setAttackBonus"
			/>
		</div>
		<button
            @click="handleSaveNewItem"
            :disabled="!isFilled"
        >
            Add
        </button>
	</section>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import SmallTextInput from '@/components/common/SmallTextInput.vue';
import {useCharacterAttacksStore} from "@/store/palyerStats/characterAttacks";

const store = useCharacterAttacksStore();
const { attacks } = storeToRefs(store);

const newAttack = reactive({
	name: '',
	atkBonus: 0,
	damage: '',
});

const isFilled = computed(() => {
	return newAttack.damage.trim() !== '' && newAttack.atkBonus > 0 && newAttack.name.trim() !== '';
});

function setAttackName(value: string) {
	newAttack.name = value;
}

function setAttackBonus(value: number) {
	newAttack.atkBonus = Number(value);
}

function setAttackDamage(value: string) {
	newAttack.damage = value;
}

function handleSaveNewItem() {
//	if (!isFilled) return;

	const t = { ...newAttack };
	store.setNewCharacterAttack(t);

	newAttack.name = '';
	newAttack.atkBonus = 0;
	newAttack.damage = '';
}
</script>

<style lang="scss" scoped>
h3 {
	margin-bottom: 1em;
}

.attacks-list {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1em;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
}
.attacks-input {
	display: flex;
	justify-content: space-between;
}
</style>
