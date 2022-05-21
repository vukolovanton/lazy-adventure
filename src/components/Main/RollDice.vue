<template>
	<div class="container">
		<select @change="handleDiceChange">
			<option v-for="dice in dices">{{ dice }}</option>
		</select>
		<button @click="handleRollDice">Roll!</button>
		<DicePreview :value="state.roll" />
	</div>
</template>

<script lang="ts" setup>
import { randomIntFromInterval } from '@/utils/utils';
import { reactive, ref, onMounted } from 'vue';
import DicePreview from './DicePreview.vue';

const props = defineProps(['socket']);
const dices = ref(['d6', 'd12']);
const state = reactive({
	count: 1,
	dice: 'd6',
	roll: 0,
});
const cubeRef = ref();

onMounted(() => {
	const dice = document.getElementById('dice');
	cubeRef.value = dice;

	props.socket.on('diceRolled', (data: { value: number }) => {
		state.roll = data.value;
		handleRotate();
	});
});

const min = 1;
const max = 10;

function handleDiceChange(event: Event) {
	const t = (event.target as HTMLInputElement).value;
	state.dice = t;
}

function handleRollDice() {
	const diceNumber = Number(state.dice.substring(1));
	const value = randomIntFromInterval(1, diceNumber);
	state.roll = value;

	handleRotate();

	props.socket.emit('roll', {
		value,
	});
}

function getRandom(max: number, min: number) {
	return (Math.floor(Math.random() * (max - min)) + min) * 90;
}

function handleRotate() {
	const xRand = getRandom(max, min);
	const yRand = getRandom(max, min);

	cubeRef.value.style.webkitTransform =
		'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
	cubeRef.value.style.transform =
		'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
	align-items: center;
	margin-bottom: 1em;
}
</style>
