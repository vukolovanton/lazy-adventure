<template>
	<div>
		<select
			name="select"
			id="backgroundSelection"
			@change="handleBackgroundChange"
		>
			<option selected disabled>Tile to display</option>
			<option v-for="tile in state.tiles" :value="tile.url">
				{{ tile.name }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import TilesService from '@/utils/tiles.service';
import { TilesSources } from '@/interfaces/TilesEditorInterfaces';
import { useTilesEditorStore } from '@/store/tilesEditorStore';
import { storeToRefs } from 'pinia';

const store = useTilesEditorStore();
const { selectedTileUrl } = storeToRefs(store);

const state = reactive({
	tiles: [] as TilesSources[],
});

onMounted(() => {
	TilesService.fetchAllAvailableileTiles().then((tiles) => {
		state.tiles = tiles;
		console.log(tiles);
	});
});

function handleBackgroundChange(event: Event) {
	const t = (event.target as HTMLInputElement).value;
	store.setSelectedTileUrl(t);
}
</script>
