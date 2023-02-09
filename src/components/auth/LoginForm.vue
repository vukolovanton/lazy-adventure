<template>
	<section>
		<div class="container">
			<h2>Login</h2>
			<div class="input-container">
				<input
					spellcheck="false"
					type="email"
					id="email"
					v-model="email"
				/>
				<label for="email">email</label>
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

const email = ref('');
const password = ref('');
const checked = ref(false);

async function handleAuth() {
	const user = {
		email: email.value,
		password: password.value,
	};

	store.setIsLoading(true);

	try {
		if (checked.value) {
			// Register
			const response: AxiosResponse<AuthResponse> | void = await AuthService.register(user);
			const result = Promise.resolve(response);

			if (result) {
				store.setIsLoading(false);
				router.push('/stats');
			}
		} else {
			// Login
			const response = await AuthService.login(user);
            if (response?.jwtToken) {
                const result = await AuthService.getUserInfo();
                if (result) {
    				store.setIsLoading(false);
    				await router.push('/stats');
    			}
            }
		}

		store.setIsLoading(false);
	} catch (e) {
    console.log('eeeee')
		store.setIsLoading(false);
		alert(e);
	}
}
</script>

<style lang="scss" scoped src="./loginForm.scss"></style>
