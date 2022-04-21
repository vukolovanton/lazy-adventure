<template>
	<nav aria-label="main navigation" role="navigation" class="navbar">
		<RouterLink to="/" class="navbar-item">
			<h2>Lazy Adventure</h2>
		</RouterLink>
		<div>
			<RouterLink to="/map-editor" class="navbar-item">Map Editor</RouterLink>
			<RouterLink to="/stats" class="navbar-item">Stats</RouterLink>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store/globalStore';
import { storeToRefs } from 'pinia';

const store = storeToRefs(useGlobalStore());
</script>

<style scoped>
nav {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0.5em;
	background: #fafafa;
	border-bottom: 1px solid #eaeaea;
}

h2 {
	font-size: 1.5em;
	font-weight: 700;
	margin: 0;
}

.navbar-item {
	font-size: 1em;
	font-weight: 400;
	margin: 0;
	padding: 0.5em;
	cursor: pointer;
}
</style>
