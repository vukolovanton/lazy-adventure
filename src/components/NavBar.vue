<template>
	<nav aria-label="main navigation" role="navigation" class="navbar">
		<RouterLink to="/" class="navbar-item">
			<h2>Lazy Adventure</h2>
		</RouterLink>
		<Character />
		<div>
			<RouterLink to="/map-editor" class="navbar-item">Map Editor</RouterLink>
			<RouterLink to="/stats" class="navbar-item">Stats</RouterLink>
			<span @click="handleLogout" class="navbar-item">Logout</span>
		</div>
	</nav>
	<div class="snackbar" ref="snackbarRef">
		<strong>Success!</strong>
		<span>{{ successMessage }}</span>
	</div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import Character from '@/components/Character.vue';
import AuthService from '@/utils/auth/auth.service';
import { useGlobalStore } from '@/store/globalStore';
import { storeToRefs } from 'pinia';

const globalStore = useGlobalStore();
const { isSuccess, successMessage } = storeToRefs(globalStore);

const router = useRouter();
const snackbarRef = ref();

function handleLogout() {
	AuthService.logout();
	router.push('/login');
}

watch(isSuccess, (newValue) => {
	snackbarRef.value.classList.add('show');
	setTimeout(() => {
		snackbarRef.value.classList.remove('show');
		globalStore.setSuccessMessage('');
	}, 3000);
});
</script>

<style scoped lang="scss">
.snackbar {
	display: flex;
	flex-direction: column;
	width: max-content;
	padding: 1em 2em;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
		rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	font-weight: bold;
	position: absolute;
	z-index: 20;
	top: 4em;
	right: 0;
	background-color: white;
	transform: translateX(100%);
	transition: all 0.3s ease-in-out;

	& > strong {
		color: green;
	}

	&.show {
		transform: translateX(0);
	}
}

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
