import { defineStore } from 'pinia';
import {
	TilesSelection,
	TilesCoordinates,
} from '@/interfaces/TilesEditorInterfaces';
import { GRID_SIZE } from '@/constants';

interface TilesStoreInterface {
	isMouseDown: boolean;
	selection: TilesSelection;
	currentLayer: number;
	layers: Array<TilesCoordinates>;
	sizeOfCrop: number;
	selectedTileUrl: string | null;
}

export const useTilesEditorStore = defineStore('tilesEditorStore', {
	state: (): TilesStoreInterface => ({
		isMouseDown: false,
		selection: [5, 2],
		currentLayer: 0,
		layers: [{ '1-1': [2 - 2] }, {}, {}],
		sizeOfCrop: GRID_SIZE.TILE,
		selectedTileUrl: null,
	}),

	actions: {
		setCurrentLayer(value: number) {
			this.currentLayer = value;
		},
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
			this.layers.push({}, {}, {});
		},
		deleteLayers(key: string) {
			const newLayersRef = this.layers.slice();
			delete newLayersRef[this.currentLayer][key];
			this.layers = newLayersRef;
		},
		setSelectedTileUrl(tileUrl: string) {
			this.selectedTileUrl = tileUrl;
		},
	},
});
