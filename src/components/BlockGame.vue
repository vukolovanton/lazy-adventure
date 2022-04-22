<template>
	<div class="drag-wrapper">
		<div class="drag-container" ref="container">
			<div
				class="drag-item"
				ref="draggable"
				:style="{
					top: `${restrictedY}px`,
					left: `${restrictedX}px`,
					// backgroundImage: `url(${globalUser.avatarSource})`,
				}"
				@mouseup="handleDrop"
			></div>
		</div>
	</div>
	<h3 v-for="user in state.users">
		{{ user.username }}
		{{ user.details.avatarSource }}
	</h3>
</template>

<script setup lang="ts">
import {
	reactive,
	onBeforeMount,
	onMounted,
	ref,
	onUnmounted,
	computed,
} from 'vue';
import { io, Socket } from 'socket.io-client';
import { useDraggable, useElementBounding, clamp } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { SOCKET_IO_URL, SOCKET_IO_ROOM_NAME } from '@/constants';
import { useGlobalStore } from '@/store/globalStore';
import { SocketResponse, SocketResponseData } from '@/interfaces/User';

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {
		x: 0,
		y: 0,
	},
	users: [] as SocketResponseData[],
});

const playerBaseInfoStore = usePlayerBaseInfo();
const globalStore = useGlobalStore();
const { user: globalUser } = storeToRefs(globalStore);
const { characterName } = storeToRefs(playerBaseInfoStore);

const container = ref();
const draggable = ref();

const { left, right, top, bottom } = useElementBounding(container);
const { width, height } = useElementBounding(draggable);
const { x, y } = useDraggable(draggable);

const restrictedX = computed(() =>
	clamp(left.value, x.value, right.value - width.value)
);
const restrictedY = computed(() =>
	clamp(top.value, y.value, bottom.value - height.value)
);

function handleDrop() {
	state.socket.emit('drop', {
		x: x.value,
		y: y.value,
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
		console.log(response);
		state.users = response.data;
		console.log(state.users);
	});

	state.socket.on('left', (response) => {
		console.log(response);
		state.users = response.data;
	});
	// ==

	state.socket.on('position', (position) => {
		state.position = position;

		x.value = position.x;
		y.value = position.y;
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
