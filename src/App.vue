<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
	<NavBar />
	<RouterView />
</template>

<style lang="scss">
:root {
	--accent-color: bisque;
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
	cursor: pointer;
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

.border {
	border-color: black;
	border-width: 3px 4px 3px 5px;
	// background: #ddd;
	border: 1px solid #222;
	box-shadow: 3px 3px 0 #222;
	padding: 0.2em 0.4em;

	border: 10px solid black;
	border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='%23B88846'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E")
		25;
}
</style>
