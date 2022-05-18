import { Ref } from 'vue';
import { useTilesEditorStore } from '@/store/tilesEditorStore';
import { useEventListener } from './useEventListener';
import TilesService from '@/utils/tiles.service';
import { storeToRefs } from 'pinia';

export function useTilesEditor(
	canvas: Ref<HTMLCanvasElement>,
	tilesetSource: Ref<HTMLImageElement>,
	tilesetSelection: Ref<HTMLImageElement>,
	context: CanvasRenderingContext2D
) {
	const store = useTilesEditorStore();
	const { mapName } = storeToRefs(store);

	function getCoordinates(e: any): Array<number> {
		const { x, y } = e.target.getBoundingClientRect();
		const mouseX = e.clientX - x;
		const mouseY = e.clientY - y;
		return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
	}

	function draw() {
		context.clearRect(0, 0, canvas.value.width, canvas.value.height);

		store.layers.forEach((layer) => {
			Object.keys(layer).forEach((key) => {
				const [x, y] = key.split('-').map(Number);
				const [tileX, tileY] = layer[key];

				context.drawImage(
					tilesetSource.value,
					tileX * store.sizeOfCrop,
					tileY * store.sizeOfCrop,
					store.sizeOfCrop,
					store.sizeOfCrop,
					x * store.sizeOfCrop,
					y * store.sizeOfCrop,
					store.sizeOfCrop,
					store.sizeOfCrop
				);
			});
		});
	}

	function addTile(mouseEvent: MouseEvent) {
		let clicked = getCoordinates(mouseEvent);
		let key = `${clicked[0]}-${clicked[1]}`;

		if (mouseEvent.shiftKey) {
			store.deleteLayers(key);
		} else {
			store.setLayers(store.currentLayer, key, [
				store.selection[0],
				store.selection[1],
			]);
		}

		draw();
	}

	function clearCanvas() {
		store.setCurrentLayer(0);
		store.clearLayers();
		draw();
	}

	async function exportCanvas() {
		const promise = new Promise((resolve) => {
			canvas.value.toBlob((blob) => {
				const file = new File([blob!], mapName.value);
				resolve(file);
			});
		});

		promise
			.then((f: any) => {
				return TilesService.saveTile(f);
			})
			.then((response) => {
				store.setMapName('');
				console.log(response);
			});
	}

	// EVENT LISTENERS
	useEventListener('.canvas', 'mousemove', (event: MouseEvent) => {
		if (store.isMouseDown) {
			addTile(event);
		}
	});
	useEventListener('.canvas', 'mouseup', () => {
		store.setIsMouseDown(false);
	});
	useEventListener('.canvas', 'mouseleave', () => {
		store.setIsMouseDown(false);
	});

	useEventListener('.canvas', 'mousedown', (event) => {
		store.setIsMouseDown(true);
		const [x, y] = getCoordinates(event);

		store.setLayers(store.currentLayer, `${x}-${y}`, store.selection);
		draw();
	});

	useEventListener('.tileset-container', 'mousedown', (event) => {
		const [x, y] = getCoordinates(event);
		store.setSelection([x, y]);
		tilesetSelection.value.style.left = `${x * store.sizeOfCrop}px`;
		tilesetSelection.value.style.top = `${y * store.sizeOfCrop}px`;
	});

	useEventListener('.clear-button', 'click', clearCanvas);
	useEventListener('.export-button', 'click', exportCanvas);
}
