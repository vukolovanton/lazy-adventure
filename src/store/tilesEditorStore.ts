import { defineStore } from 'pinia';
import {
	TilesSelection,
	TilesCoordinates,
} from '@/interfaces/TilesEditorInterfaces';

interface TilesStoreInterface {
	isMouseDown: boolean;
	selection: TilesSelection;
	currentLayer: number;
	layers: Array<TilesCoordinates>;
	sizeOfCrop: number;
}

export const useTilesEditorStore = defineStore('tilesEditorStore', {
	state: (): TilesStoreInterface => ({
		isMouseDown: false,
		selection: [5, 2],
		currentLayer: 0,
		layers: [{ '1-1': [2 - 2] }],
		sizeOfCrop: 32,
	}),

	actions: {
		setIsMouseDown(value: boolean) {
			this.isMouseDown = value;
		},
		setSelection(newSelection: TilesSelection) {
			this.selection = newSelection;
		},
		setLayers(layer: number, key: string, data: Array<number>) {
			this.layers[layer][key] = data;
		},
		clearLayers() {
			this.layers.splice(0, this.layers.length);
			this.layers.push({});
		},
		deleteLayers(key: string) {
			const newLayersRef = this.layers.slice();
			delete newLayersRef[this.currentLayer][key];
			this.layers = newLayersRef;
		},
	},
});
