<script setup lang="ts">
import TilesEditor from '@/components/TilesEditor.vue';
import BlockGame from '@/components/BlockGame.vue';
import PlayerSheet from '@/components/PlayerSheet/PlayerSheet.vue';
</script>

<template>
	<PlayerSheet />
</template>

<style>
@font-face {
	font-family: 'SpectralSC-Regular';
	font-weight: 400;
	font-style: normal;
	font-display: auto;
	unicode-range: U+000-5FF;
	src: local('SpectralSC-Regular'),
		url('@/assets/SpectralSC-Regular.ttf') format('truetype');
}
@font-face {
	font-family: 'SpectralSC-Bold';
	font-weight: 700;
	font-style: normal;
	font-display: auto;
	unicode-range: U+000-5FF;
	src: local('SpectralSC-Bold'),
		url('@/assets/SpectralSC-Bold.ttf') format('truetype');
}

#app {
	font-family: SpectralSC-Regular, Avenir, Helvetica, Arial, sans-serif;
	font-size: 16px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

input {
	font-family: inherit;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

button {
	font-family: inherit;
	border: none;
	background: none;
	font-size: 0.8em;
	padding: 0em 0.4em;
	margin-left: 0.2em;
	margin-right: 0.2em;
	cursor: pointer;
	/* text-shadow: 1px 0 0 black; */
}
</style>
