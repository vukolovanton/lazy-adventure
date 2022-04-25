<template>
	<section class="tiles-editor-container">
		<div>
			<header>
				<h1>Tile Editor</h1>
				<div>
					<button class="clear-button">Clear canvas</button>
					<button class="export-button">Export image</button>
				</div>
			</header>
			<aside>
				<div class="tileset-container">
					<img
						ref="tilesetSource"
						src="../assets/TileEditorSpritesheet.2x_2.png"
					/>
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

const canvas = ref();
const tilesetSource = ref();
const tilesetSelection = ref();

onMounted(() => {
	if (canvas.value) {
		const context = canvas.value.getContext('2d');
		useTilesEditor(canvas, tilesetSource, tilesetSelection, context);
	}
});
</script>

<style scoped>
.tiles-editor-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.canvas-container {
	border: 1px dashed black;
}

canvas {
	background: #f4f8f9;
}

.tileset-container {
	position: relative;
}
.tileset-container_selection {
	position: absolute;
	outline: 3px solid cyan;
	left: 0;
	top: 0;
}
</style>
