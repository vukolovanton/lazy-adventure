<template>
	<section class="InventoryList">
		<h3>Inventory</h3>
		<div v-for="item in inventory" class="spells-list">
			<span>{{ item.name }}</span>
			<span>{{ item.weight }}</span>
			<span>{{ item.count }}</span>
			<button @click="store.removeFromInventory(item)">X</button>
		</div>
		<div class="spells-input">
			<SmallTextInput
				label="Name"
				id="itemName"
				:input-value="newItem.name"
				@set-input-value="setItemName"
			/>
			<SmallTextInput
				label="Weight"
				id="itemWeight"
				:input-value="newItem.weight"
				@set-input-value="setItemWeight"
			/>
			<SmallTextInput
				label="Count"
				id="itemCount"
				:input-value="newItem.count"
				@set-input-value="setItemCount"
			/>
		</div>
		<button @click="handleSaveNewItem" :disabled="!isFilled">Add</button>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePlayerInventoryStore } from '@/store/palyerStats/playerInventoryStore';
import SmallTextInput from '@/components/common/SmallTextInput.vue';
import { computed, reactive } from 'vue';

const store = usePlayerInventoryStore();
const { inventory } = storeToRefs(store);

const newItem = reactive({
	name: '',
	count: 0,
	weight: 0,
});

const isFilled = computed(() => {
	return newItem.count > 0 && newItem.weight > 0 && newItem.name.trim() !== '';
});

function setItemName(value: string) {
	newItem.name = value;
}

function setItemCount(value: number) {
	newItem.count = Number(value);
}

function setItemWeight(value: number) {
	newItem.weight = value;
}

function handleSaveNewItem() {
	if (!isFilled) return;

	const t = { ...newItem };
	store.setNewInventoryItem(t);

	newItem.name = '';
	newItem.count = 0;
	newItem.weight = 0;
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
