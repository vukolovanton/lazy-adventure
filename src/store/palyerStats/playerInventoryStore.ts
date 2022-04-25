import { defineStore } from 'pinia';
import { InventoryItem } from '@/interfaces/PlayerInventory';
import { trimString } from '@/utils/utils';
import { StoreIds } from '@/constants';

type PlayerInventoryStore = {
	inventory: InventoryItem[];
};

export const usePlayerInventoryStore = defineStore(StoreIds.PlayerInventory, {
	state: (): PlayerInventoryStore => ({
		inventory: [],
	}),

	actions: {
		setPlayerInventory(items: InventoryItem[]) {
			this.inventory = items;
		},
		setNewInventoryItem(item: InventoryItem) {
			this.inventory.push(item);
		},
		removeFromInventory(item: InventoryItem) {
			const newState = this.inventory.filter(
				(i) => trimString(i.name) !== trimString(item.name)
			);
			this.inventory = newState;
		},
	},

	persist: true,
});
