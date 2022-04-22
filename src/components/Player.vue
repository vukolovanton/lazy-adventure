<template>
	<div class="container">
		<div>
			<img :src="avatarSrc" width="64" height="64" v-if="avatarSrc" />
		</div>
		<div class="stats">
			<h3>{{ characterName }}</h3>
			<span class="hitPoints">
				{{ currentHitPoints }} / {{ maximumHitPoints }}
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';
import { getAvatarSource } from '@/utils/utils';

const playerBaseInfoStore = usePlayerBaseInfo();
const playerAdditionalInfoStore = usePlayerAdditionalInfo();

const { characterName, characterClass } = storeToRefs(playerBaseInfoStore);
const { currentHitPoints, maximumHitPoints } = storeToRefs(
	playerAdditionalInfoStore
);

const avatarSrc = computed(() => {
	return getAvatarSource(characterClass.value);
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}

.stats {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin-left: 1em;
}

.hitPoints {
	font-size: 0.8rem;
	color: var(--accent-color);
}
</style>
