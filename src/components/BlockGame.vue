<template>
	<section class="container">
		<div class="drag-wrapper">
			<TilesSelector />

			<div
				id="gameField"
				class="drag-container"
				ref="container"
				:style="{
					width: `${GRID_SIZE.WIDTH}px`,
					height: `${GRID_SIZE.HEIGHT}px`,
					backgroundImage: `var(--background-grid), url('${state.backgroundSrc}')`,
					backgroundSize: `${GRID_SIZE.TILE}px ${GRID_SIZE.TILE}px, ${GRID_SIZE.TILE}px ${GRID_SIZE.TILE}px, auto`,
				}"
			>
				<vue-resizable
					:key="user.details.userId"
					v-for="user in state.users"
					:customIndex="user.details.userId"
					dragSelector=".drag-item"
					:fit-parent="true"
					:width="GRID_SIZE.TILE"
					:height="GRID_SIZE.TILE"
					:left="state.position[user.details.userId]?.x || 0"
					:top="state.position[user.details.userId]?.y || 0"
					@drag:end="handleDrop"
					:disableAttributes="['w', 'h']"
				>
					<div
						class="drag-item"
						:style="{
							backgroundImage: 'url(' + user.details.avatarSource + ')',
							width: `${GRID_SIZE.TILE}px`,
							height: `${GRID_SIZE.TILE}px`,
						}"
					>
						{{ user.username }}
					</div>
				</vue-resizable>
			</div>
		</div>
		<div class="connected-users-container">
			<RollDice :socket="state.socket" />

			<ConnectedPlayer :users="state.users" />
		</div>
	</section>
</template>

<script setup lang="ts">
import {
	reactive,
	onBeforeMount,
	onMounted,
	ref,
	onUnmounted,
	watch,
} from 'vue';
import { io, Socket } from 'socket.io-client';
import { SOCKET_IO_URL, SOCKET_IO_ROOM_NAME } from '@/constants';
import { useGlobalStore } from '@/store/globalStore';
import { SocketResponse, SocketResponseData } from '@/interfaces/User';
import VueResizable from '@/components/VueResizable.vue';
import { GRID_SIZE } from '@/constants';
import ConnectedPlayer from '@/components/ConnectedPlayer.vue';
import TilesSelector from './Main/TilesSelector.vue';
import { useBlockGameStores } from '@/utils/useBlockGameStores';
import RollDice from './Main/RollDice.vue';
import DicePreview from './Main/DicePreview.vue';

// === State
const container = ref();

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {},
	users: [] as SocketResponseData[],
	selector: ['drag-item-1', 'drag-item-2', 'drag-item-3', 'drag-item-4'],
	backgroundSrc: '',
});

const globalStore = useGlobalStore();
const { stats, characterName, selectedTileUrl } = useBlockGameStores();
// ===

watch(selectedTileUrl, (newValue) => {
	state.socket.emit('src', {
		src: newValue,
	});
});

function handleDrop(data: { left: number; top: number; index: string }) {
	state.socket.emit('drop', {
		x: data.left,
		y: data.top,
		userId: data.index,
	});
}

// === Events
onBeforeMount(() => {
	state.socket = io(SOCKET_IO_URL);
});

onMounted(() => {
	// === Join Room
	state.socket.emit('joinRoom', {
		username: characterName.value,
		room: SOCKET_IO_ROOM_NAME,
		details: {
			avatarSource: globalStore.user.avatarSource,
			userId: globalStore.user.id,
			stats,
		},
	});

	state.socket.on('joined', (response: SocketResponse) => {
		state.users = response.data;
	});

	state.socket.on('left', (response) => {
		state.users = response.data;
	});
	// ===

	state.socket.on('position', (position) => {
		state.position = position;
	});

	state.socket.on('newSrc', ({ src }) => {
		state.backgroundSrc = src.src;
	});
});

onUnmounted(() => {
	state.socket.emit('leaveRoom', {
		username: characterName.value,
		room: SOCKET_IO_ROOM_NAME,
	});

	state.socket.close();
});
// ===
</script>

<style scoped lang="scss">
.container {
	display: flex;
}
.drag-wrapper {
	position: relative;
	width: 1000px;
}

.drag-container {
	border: 1px solid black;

	background-color: var(--game-field-background-color);
	// background-image: var(--background-grid),
	// 	url('http://localhost:3001/public/file-1652796561391.png');
}

.drag-item {
	user-select: none;
	position: fixed;
	cursor: grabbing;
	background-position: center;
	background-size: contain;
}

.connected-users-container {
	display: flex;
	flex-direction: column;
	width: 400px;
}
</style>
