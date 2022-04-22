<template>
	<div ref="el" :style="style" style="position: fixed" class="draggable">
		Drag me! I am at {{ x }}, {{ y }}
	</div>
	<h3 v-for="user in users">
		{{ user.username }}
	</h3>
	<div>
		<canvas ref="game" width="480" height="480" class="canvas"></canvas>
	</div>
	<button @click="move('left')">Left</button>
	<button @click="move('right')">Right</button>
</template>

<script setup lang="ts">
import {
	reactive,
	onBeforeMount,
	onMounted,
	ref,
	watch,
	onUnmounted,
} from 'vue';
import { io, Socket } from 'socket.io-client';
import { useDraggable } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';

const playerBaseInfoStore = usePlayerBaseInfo();
const { characterName, characterClass } = storeToRefs(playerBaseInfoStore);

const state = reactive({
	socket: {} as Socket,
	context: {},
	position: {
		x: 0,
		y: 0,
	},
});

const users = ref([]);

onBeforeMount(() => {
	state.socket = io('http://localhost:3002');
});

onMounted(() => {
	// == Join Room
	state.socket.emit('joinRoom', { username: characterName.value, room: 'dev' });

	state.socket.on('joined', (response) => {
		console.log(response);
		users.value = response.data;
	});

	state.socket.on('left', (response) => {
		console.log(response);
		users.value = response.data;
	});
	// ==

	const context = game.value.getContext('2d');
	state.context = context;

	state.socket.on('position', (position) => {
		state.position = position;
		state.context.clearRect(0, 0, 480, 480);
		state.context.fillRect(state.position.x, state.position.y, 32, 32);
	});
});

onUnmounted(() => {
	state.socket.emit('leaveRoom', {
		username: characterName.value,
		room: 'dev',
	});
	state.socket.close();
});

const game = ref();
const el = ref<HTMLElement | null>(null);

const { x, y, style } = useDraggable(el, {
	initialValue: { x: 40, y: 40 },
});

function move(direction: any) {
	state.socket.emit('move', direction);
}
</script>

<style scoped>
.canvas {
	border: 1px solid #000;
	background-color: aliceblue;
}

.draggable {
	width: 100px;
	height: 100px;
	background-color: #f00;
	cursor: grabbing;
	user-select: none;
	-webkit-user-select: none;
}
</style>
