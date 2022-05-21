<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
	<NavBar />
	<RouterView />
</template>

<style lang="scss">
:root {
	--accent-color: brown;
	--game-field-background-color: #f4f8f9;
	--background-grid: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.3) 1px,
			transparent 1px
		),
		linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
}

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

a {
	text-decoration: none;
	color: inherit;
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
	box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 3px 0px;

	&.main {
		width: 5em;
		background-color: black;
		color: white;
		font-size: 1em;

		&:hover {
			background-color: dimgray;
		}
	}
}

input[type='checkbox'] {
	margin-right: 0.5em;
}

select {
	appearance: none;
	background-color: transparent;
	border: none;
	padding: 0 1em 0 0;
	margin: 0;
	font-family: inherit;
	font-weight: bold;
	font-size: 1.2em;
	cursor: inherit;
	line-height: inherit;
	border-radius: 0;
	border-bottom: 1px solid #ccc;

	&.small {
		font-size: 0.8em;
		border: none;
		margin-left: 0.5em;
	}
}

label {
	font-size: 0.6em;
}
</style>
