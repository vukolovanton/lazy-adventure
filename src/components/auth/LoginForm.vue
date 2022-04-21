<template>
	<section>
		<div class="container">
			<h2>Login</h2>
			<div class="input-container">
				<input
					spellcheck="false"
					type="text"
					id="username"
					v-model="username"
				/>
				<label for="username">Username</label>
			</div>
			<div class="input-container">
				<input
					spellcheck="false"
					type="password"
					id="password"
					v-model="password"
				/>
				<label for="password">Password</label>
			</div>
			<input type="checkbox" v-model="checked" id="newAcctoun" />
			<label for="newAcctoun">Create new account</label>
			<button @click="handleAuth">Next</button>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/globalStore';
import AuthService from '@/utils/auth/auth.service';
import { AuthResponse } from '@/interfaces/User';
import { AxiosResponse } from 'axios';

const router = useRouter();
const store = useGlobalStore();

const username = ref('');
const password = ref('');
const checked = ref(false);

async function handleAuth() {
	const user = {
		username: username.value,
		password: password.value,
	};

	store.setIsLoading(true);

	try {
		if (checked.value) {
			// Register
			const response: AxiosResponse<AuthResponse> = await AuthService.register(
				user
			);

			const result = await Promise.resolve(response);
			if (result) {
				store.setIsLoading(false);
				router.push('/');
			}
		} else {
			// Login
			const response = AuthService.login(user);

			const result = await Promise.resolve(response);
			if (result) {
				store.setIsLoading(false);
				router.push('/');
			}
		}

		store.setIsLoading(false);
	} catch (e) {
		store.setIsLoading(false);
		alert(e);
	}
}
</script>

<style lang="scss" scoped src="./loginForm.scss"></style>
