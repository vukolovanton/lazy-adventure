<template>
	<div class="dice-container">
		<div id="dice">
			<div class="front face">{{ props.value }}</div>
			<div class="back face">{{ props.value }}</div>
			<div class="left face">{{ props.value }}</div>
			<div class="right face">{{ props.value }}</div>
			<div class="top face">{{ props.value }}</div>
			<div class="bottom face">{{ props.value }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['value']);
</script>

<style scoped lang="scss">
$width: 50px;
$height: 50px;
$transform: 25px;

.dice-container {
	display: flex;
	justify-content: center;
	perspective: 1000px;
	-webkit-perspective: 1000px;
	perspective-origin: 50%;
	-webkit-perspective-origin: 50%;
	margin-left: 2em;
	box-shadow: rgba(0, 0, 0, 0.7) 10px 9px 15px -5px;
}

#dice {
	height: $width;
	width: $height;
	transform-style: preserve-3d;
	transition: transform 1s;
}

.face {
	background-color: black;
	height: $width;
	width: $height;
	border: 2px solid var(--accent-color);
	box-sizing: border-box;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 26px;
	font-weight: bold;
	color: white;

	&::after {
		content: '.';
	}
}

.front {
	transform: translateZ($transform);
}

.back {
	transform: rotateX(-180deg) translateZ($transform);
}

.right {
	transform: rotateY(90deg) translateZ($transform);
}

.left {
	transform: rotateY(-90deg) translateZ($transform);
}

.top {
	transform: rotateX(90deg) translateZ($transform);
}

.bottom {
	transform: rotateX(-90deg) translateZ($transform);
}
</style>
