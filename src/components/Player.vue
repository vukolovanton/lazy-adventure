<template>
	<div class="container" @click="redirectToHome">
		<div>
			<img :src="avatarSrc" width="64" height="64" v-if="avatarSrc" />
		</div>
		<div class="stats">
			<h3>{{ characterName }}</h3>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { getAvatarSource } from '@/utils/utils';

const router = useRouter();

const playerBaseInfoStore = usePlayerBaseInfo();
const { characterName, characterClass, gender } =
	storeToRefs(playerBaseInfoStore);

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
