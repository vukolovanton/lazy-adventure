<template>
	<div>
		<canvas ref="game" width="480" height="480" class="canvas"></canvas>
	</div>
	<button @click="move('left')">Left</button>
	<button @click="move('right')">Right</button>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, ref } from 'vue';
import { io } from 'socket.io-client';

const state = reactive({
	socket: {},
	context: {},
	position: {
		x: 0,
		y: 0,
	},
});

const game = ref();

function move(direction: any) {
	state.socket.emit('move', direction);
}

onBeforeMount(() => {
	state.socket = io('http://localhost:3002');
});

onMounted(() => {
	const context = game.value.getContext('2d');
	state.context = context;
	state.socket.on('position', (position) => {
		state.position = position;
		state.context.clearRect(0, 0, 480, 480);
		state.context.fillRect(state.position.x, state.position.y, 32, 32);
	});
});
</script>

<style scoped>
.canvas {
	border: 1px solid #000;
	background-color: aliceblue;
}
</style>
