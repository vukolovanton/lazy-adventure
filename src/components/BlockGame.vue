<template>
	<div class="drag-wrapper">
		<div class="drag-container" ref="container">
			<vue-resizable
				dragSelector=".drag-item"
				:fit-parent="true"
				:width="64"
				:height="64"
				:left="state.position.x"
				:top="state.position.y"
				@drag:end="handleDrop"
			>
				<div class="drag-item"></div>
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

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {},
	users: [] as SocketResponseData[],
});

const playerBaseInfoStore = usePlayerBaseInfo();
const globalStore = useGlobalStore();
const { user: globalUser } = storeToRefs(globalStore);
const { characterName } = storeToRefs(playerBaseInfoStore);

const container = ref();

function handleDrop(data: { eventName: string; left: number; top: number }) {
	console.log(data);
	state.socket.emit('drop', {
		x: data.left,
		y: data.top,
		userId: globalStore.user.id,
	});
}

onBeforeMount(() => {
	state.socket = io(SOCKET_IO_URL);
});

onMounted(() => {
	// == Join Room
	state.socket.emit('joinRoom', {
		username: characterName.value,
		room: SOCKET_IO_ROOM_NAME,
		details: {
			avatarSource: globalUser.value.avatarSource,
		},
	});

	state.socket.on('joined', (response: SocketResponse) => {
		state.users = response.data;
	});

	state.socket.on('left', (response) => {
		console.log(response);
		state.users = response.data;
	});
	// ==

	state.socket.on('position', (position) => {
		console.log(position, 'position');
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
</script>

<style scoped>
.drag-wrapper {
	/* height: 100vh;
	background: teal;
	display: grid;
	place-items: center; */
}

.drag-container {
	background: white;
	width: 500px;
	height: 500px;
	position: relative;
	border: 1px solid black;
}

.drag-item {
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
