<template>
	<div class="drag-wrapper">
		<div class="drag-container" ref="container">
			<vue-resizable
				:key="user.details.userId"
				v-for="(user, index) in state.users"
				:customIndex="user.details.userId"
				dragSelector=".drag-item-1"
				:fit-parent="true"
				:width="64"
				:height="64"
				:left="state.position[user.details.userId].x"
				:top="state.position[user.details.userId].y"
				@drag:end="handleDrop"
				:disableAttributes="['w', 'h']"
			>
				<div class="drag-item-1">{{ user.username }}</div>
			</vue-resizable>
		</div>
	</div>
	<h3 v-for="user in state.users">
		{{ user.username }}
		{{ user.details.avatarSource }}
	</h3>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, ref, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { SOCKET_IO_URL, SOCKET_IO_ROOM_NAME } from '@/constants';
import { useGlobalStore } from '@/store/globalStore';
import { SocketResponse, SocketResponseData } from '@/interfaces/User';
import VueResizable from '@/components/VueResizable.vue';
import VueDrag from '@/components/temp/VueDrag.vue';

const globalStore = useGlobalStore();
const { user: userFromRef } = storeToRefs(globalStore);

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {},
	users: [] as SocketResponseData[],
	selector: ['drag-item-1', 'drag-item-2', 'drag-item-3', 'drag-item-4'],
});

const playerBaseInfoStore = usePlayerBaseInfo();
const { characterName } = storeToRefs(playerBaseInfoStore);

const container = ref();

onBeforeMount(() => {
	state.socket = io(SOCKET_IO_URL);
});

onMounted(() => {
	// == Join Room
	state.socket.emit('joinRoom', {
		username: characterName.value,
		room: SOCKET_IO_ROOM_NAME,
		details: {
			userId: globalStore.user.id,
		},
	});

	state.socket.on('joined', (response: SocketResponse) => {
		state.users = response.data;
	});

	state.socket.on('left', (response) => {
		state.users = response.data;
	});
	// ==

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

<style scoped>
.drag-wrapper {
	position: relative;
}

.drag-container {
	background: white;
	width: 500px;
	height: 500px;
	/* position: relative; */
	border: 1px solid black;
}

.drag-item-1,
.drag-item-2,
.drag-item-3,
.drag-item-4 {
	user-select: none;
	position: fixed;
	width: 32px;
	height: 32px;
	cursor: grabbing;
	background-position: center;
	background-size: contain;
	background-color: red;
}
</style>
