<template>
	<div class="container" @click="redirectToHome">
		<div>
			<img :src="avatarSrc" width="64" height="64" v-if="avatarSrc" />
		</div>
		<div class="stats">
			<h3>{{ name }}</h3>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCharacterMainInfo } from '@/store/palyerStats/characterMainInfoStore';
import { getAvatarSource } from '@/utils/utils';

const router = useRouter();

const characterStore = useCharacterMainInfo();
const { name, characterClass, gender } = storeToRefs(characterStore);

const avatarSrc = computed(() => {
	return getAvatarSource(characterClass.value, gender.value);
});

function redirectToHome() {
	router.push('/');
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	cursor: pointer;
}

.stats {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-left: 1em;
}
</style>
