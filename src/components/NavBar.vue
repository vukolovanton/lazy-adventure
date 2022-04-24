<template>
	<nav aria-label="main navigation" role="navigation" class="navbar">
		<RouterLink to="/" class="navbar-item">
			<h2>Lazy Adventure</h2>
		</RouterLink>
		<Player />
		<div>
			<RouterLink to="/map-editor" class="navbar-item">Map Editor</RouterLink>
			<RouterLink to="/stats" class="navbar-item">Stats</RouterLink>
			<span @click="handleLogout">Logout</span>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Player from '@/components/Player.vue';
import AuthService from '@/utils/auth/auth.service';

const router = useRouter();

function handleLogout() {
	AuthService.logout();
	router.push('/');
}
</script>

<style scoped lang="scss">
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
	position: relative;

	&::before {
		content: url('src/assets/logo.svg');
		display: inline-block;
		transform: translateY(25%);
	}
}

.navbar-item {
	font-size: 1em;
	font-weight: 400;
	margin: 0;
	padding: 0.5em;
	cursor: pointer;
}
</style>
