<template>
	<section class="main-container">
		<div class="gamefield-wrapper">
			<div class="additional-controls">
				<TilesSelector />
				<MonsterCreation
					:name="state.monster.name"
					:hitPoints="state.monster.hitPoints"
					:handleSetMonsterName="handleSetMonsterName"
					:handleSetMonsterHitPoints="handleSetMonsterHitPoints"
					:handleAddMonster="handleAddMonster"
				/>
			</div>
			<div class="drag-wrapper">
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
							<span>
								{{ user.username }}
							</span>
						</div>
					</vue-resizable>
				</div>
			</div>
		</div>
		<div class="connected-users-container">
			<RollDice :socket="state.socket" />

			<ConnectedPlayer
				:users="state.users"
				:handleDeleteMonster="handleDeleteMonster"
				:handleUpdateMonsterHitPoints="handleUpdateMonsterHitPoints"
			/>
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
import ConnectedPlayer from '@/components/Main/ConnectedPlayer.vue';
import TilesSelector from './Main/TilesSelector.vue';
import { useBlockGameStores } from '@/utils/useBlockGameStores';
import RollDice from './Main/RollDice.vue';
import MonsterCreation from './Main/MonsterCreation.vue';

// === State
const container = ref();

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {},
	users: [] as SocketResponseData[],
	selector: ['drag-item-1', 'drag-item-2', 'drag-item-3', 'drag-item-4'],
	backgroundSrc: '',
	monster: {
		hitPoints: 0,
		name: '',
	},
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

function handleSetMonsterHitPoints(value: number) {
	state.monster.hitPoints = value;
}

function handleSetMonsterName(value: string) {
	state.monster.name = value;
}

function handleUpdateMonsterHitPoints(value: any, id: string) {
	state.socket.emit('updateMonsterHitPoints', {
		currentHitPoints: value,
		userId: id,
	});
}

function handleDeleteMonster(id: string) {
	state.socket.emit('removeMonster', {
		userId: id,
	});
}

function handleAddMonster() {
	const tempId = Date.now().toString();

	state.socket.emit('joinRoom', {
		username: state.monster.name,
		room: SOCKET_IO_ROOM_NAME,
		details: {
			avatarSource: 'src/assets/characters/wizard-m.png',
			userId: tempId,
			stats: {
				maximumHitPoints: state.monster.hitPoints,
				currentHitPoints: state.monster.hitPoints,
				isPlayer: false,
			},
		},
	});

	handleSetMonsterHitPoints(0);
	handleSetMonsterName('');
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
			stats: {
				...stats,
				isPlayer: true,
			},
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

	state.socket.on('updateMonsterHealth', (data) => {
		const monsterToUpdateIndex = state.users.findIndex(
			(user) => user.details.userId === data.details.userId
		);
		state.users[monsterToUpdateIndex].details.stats.currentHitPoints =
			data.details.currentHitPoints;
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
.main-container {
	display: flex;
	justify-content: space-between;
	padding: 4em 2em;
}

.additional-controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.gamefield-wrapper {
}

.drag-wrapper {
	position: relative;
}

.drag-container {
	border: 1px solid black;
	background-color: var(--game-field-background-color);
}

.drag-item {
	user-select: none;
	position: fixed;
	cursor: grabbing;
	background-position: center;
	background-size: contain;

	& span {
		position: absolute;
		top: 35px;
		transform: translateX(-20%);
		background-color: rgba(255, 255, 255, 0.9);
		font-size: 8px;
		padding: 0 10px;
	}
}

.connected-users-container {
	display: flex;
	flex-direction: column;
	width: 400px;
}
</style>
