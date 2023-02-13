<template>
	<section>
		<div class="container">
			<h2>Login</h2>
			<div class="input-container">
				<input
					spellcheck="false"
					id="characterName"
					v-model="characterName"
				/>
				<label for="characterName">Character name</label>
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

const router = useRouter();
const store = useGlobalStore();

const characterName = ref('');
const checked = ref(false);

async function handleAuth() {
	const user = {
		characterName: characterName.value,
        isDm: checked.value,
        userId: Date.now()
	};

	store.setIsLoading(true);

	try {
        AuthService.login(user);
        store.setIsLoading(false);
        await router.push('/stats');
	} catch (e) {
		store.setIsLoading(false);
		alert(e);
	}
}
</script>

<style lang="scss" scoped src="./loginForm.scss"></style>
