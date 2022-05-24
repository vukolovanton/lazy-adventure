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
	tempLayers: Array<TilesCoordinates>;
	sizeOfCrop: number;
	selectedTileUrl: string | null;
	mapName: string;
}

export const useTilesEditorStore = defineStore('tilesEditorStore', {
	state: (): TilesStoreInterface => ({
		isMouseDown: false,
		selection: [5, 2],
		currentLayer: 0,
		layers: [{ '1-1': [2 - 2] }, {}, {}],
		tempLayers: [],
		sizeOfCrop: GRID_SIZE.TILE,
		selectedTileUrl: null,
		mapName: '',
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
		setFullLayers(layers: Array<TilesCoordinates>) {
			this.layers = layers;
		},
		setTempLayers() {
			const t = JSON.parse(JSON.stringify(this.layers));
			this.tempLayers = t;
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
		setMapName(mapName: string) {
			this.mapName = mapName;
		},
	},
});
