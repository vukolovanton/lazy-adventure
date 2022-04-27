<template>
	<section class="tiles-editor-container">
		<div>
			<header>
				<div class="controlls">
					<div>
						<select
							name="currentLayer"
							@change="handleChangeCurrentLayer"
							id="currentLayer"
						>
							<option
								v-for="item in [0, 1, 2]"
								:value="item"
								:selected="store.currentLayer === item"
							>
								{{ item }}
							</option>
						</select>
						<label for="currentLayer">Current layer</label>
					</div>
					<button class="clear-button">Clear canvas</button>
					<button class="export-button">Export image</button>
				</div>
			</header>
			<aside>
				<div class="tileset-container">
					<img ref="tilesetSource" src="src/assets/tileset.png" />
					<div
						ref="tilesetSelection"
						class="tileset-container_selection"
						:style="{
							width: `${GRID_SIZE.TILE}px`,
							height: `${GRID_SIZE.TILE}px`,
						}"
					></div>
				</div>
			</aside>
		</div>
		<div class="canvas-container">
			<canvas
				ref="canvas"
				class="canvas"
				:style="{
					backgroundSize: `${GRID_SIZE.TILE}px ${GRID_SIZE.TILE}px`,
				}"
				:width="GRID_SIZE.WIDTH"
				:height="GRID_SIZE.HEIGHT"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useTilesEditor } from '../utils/useTilesEditor';
import { GRID_SIZE } from '@/constants';
import { useTilesEditorStore } from '@/store/tilesEditorStore';

const canvas = ref();
const tilesetSource = ref();
const tilesetSelection = ref();

const store = useTilesEditorStore();

function handleChangeCurrentLayer(e: any) {
	store.setCurrentLayer(Number(e.target.value));
}

onMounted(() => {
	if (canvas.value) {
		const context = canvas.value.getContext('2d');
		useTilesEditor(canvas, tilesetSource, tilesetSelection, context);
	}
});
</script>

<style scoped lang="scss">
.controlls {
	display: flex;
	justify-content: flex-start;
	gap: 2em;
	align-items: center;
}
.tiles-editor-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-top: 3em;
}

.canvas-container {
	border: 1px dashed black;
}

canvas {
	background-color: var(--game-field-background-color);
	background-image: var(--background-grid);
}

.tileset-container {
	position: relative;
	width: 512px;
	height: 512px;
	overflow: scroll;
}
.tileset-container_selection {
	position: absolute;
	outline: 3px solid cyan;
	left: 0;
	top: 0;
}
</style>
