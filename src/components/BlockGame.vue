<template>
	<section class="container">
		<div class="drag-wrapper">
			<div
				class="drag-container"
				ref="container"
				:style="{
					width: `${GRID_SIZE.WIDTH}px`,
					height: `${GRID_SIZE.HEIGHT}px`,
					backgroundSize: `${GRID_SIZE.TILE}px ${GRID_SIZE.TILE}px`,
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
					:left="state.position[user.details.userId].x"
					:top="state.position[user.details.userId].y"
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
			<ConnectedPlayer :users="state.users" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, ref, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { SOCKET_IO_URL, SOCKET_IO_ROOM_NAME } from '@/constants';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';
import { usePlayerInventoryStore } from '@/store/palyerStats/playerInventoryStore';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';
import { useGlobalStore } from '@/store/globalStore';
import { SocketResponse, SocketResponseData } from '@/interfaces/User';
import VueResizable from '@/components/VueResizable.vue';
import { GRID_SIZE } from '@/constants';
import ConnectedPlayer from '@/components/ConnectedPlayer.vue';

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {},
	users: [] as SocketResponseData[],
	selector: ['drag-item-1', 'drag-item-2', 'drag-item-3', 'drag-item-4'],
});

// === Stores
const globalStore = useGlobalStore();

const playerBaseInfoStore = usePlayerBaseInfo();
const { characterName, characterClass, level } =
	storeToRefs(playerBaseInfoStore);

const inventoryStore = usePlayerInventoryStore();
const { inventory } = storeToRefs(inventoryStore);

const spellsStore = usePlayerSpellsStore();
const { spells } = storeToRefs(spellsStore);

const store = usePlayerAdditionalInfo();
const {
	initiative,
	speed,
	currentHitPoints,
	maximumHitPoints,
	temporaryHitPoints,
	hitDice,
} = storeToRefs(store);
// ===

const container = ref();

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
				characterClass: characterClass.value,
				level: level.value,
				initiative: initiative.value,
				speed: speed.value,
				currentHitPoints: currentHitPoints.value,
				maximumHitPoints: maximumHitPoints.value,
				temporaryHitPoints: temporaryHitPoints.value,
				hitDice: hitDice.value,
				inventory: inventory.value,
				spells: spells.value,
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
});

onUnmounted(() => {
	state.socket.emit('leaveRoom', {
		username: characterName.value,
		room: SOCKET_IO_ROOM_NAME,
	});

	state.socket.close();
});

function handleDrop(data: { left: number; top: number; index: string }) {
	state.socket.emit('drop', {
		x: data.left,
		y: data.top,
		userId: data.index,
	});
}
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
	background: white;
	border: 1px solid black;
	background-image: linear-gradient(to right, grey 1px, transparent 1px),
		linear-gradient(to bottom, grey 1px, transparent 1px);
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
