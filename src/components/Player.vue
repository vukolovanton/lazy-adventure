<template>
	<div class="container">
		<div>
			<img :src="avatarSrc" width="64" height="64" />
		</div>
		<div class="stats">
			<h3>{{ characterName }}</h3>
			<span class="hitPoints"
				>{{ currentHitPoints }} / {{ maximumHitPoints }}</span
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';

import { PlayerClasses } from '@/interfaces/PlayerStats';

const playerBaseInfoStore = usePlayerBaseInfo();
const playerAdditionalInfoStore = usePlayerAdditionalInfo();

const { characterName, characterClass } = storeToRefs(playerBaseInfoStore);
const { currentHitPoints, maximumHitPoints } = storeToRefs(
	playerAdditionalInfoStore
);

const avatarSrc = computed(() => {
	switch (characterClass.value) {
		case PlayerClasses.Wizard:
			return 'src/assets/characters/wizard-m.png';
			break;
		case PlayerClasses.Druid:
			return 'src/assets/characters/druid-m.png';
			break;
		case PlayerClasses.Sorceror:
			return 'src/assets/characters/sorceror-m.png';
			break;
		case PlayerClasses.Warlock:
			return 'src/assets/characters/warlock-m.png';
			break;
		case PlayerClasses.Ranger:
			return 'src/assets/characters/ranger-m.png';
			break;
		case PlayerClasses.Rouge:
			return 'src/assets/characters/rouge-m.png';
			break;
		case PlayerClasses.Monk:
			return 'src/assets/characters/monk-m.png';
			break;
		case PlayerClasses.Bard:
			return 'src/assets/characters/bard-m.png';
			break;
		case PlayerClasses.Barbarian:
			return 'src/assets/characters/barbarian-m.png';
			break;
		case PlayerClasses.Paladin:
			return 'src/assets/characters/paladin-m.png';
			break;
		case PlayerClasses.Fighter:
			return 'src/assets/characters/fighter-m.png';
			break;
		case PlayerClasses.Cleric:
			return 'src/assets/characters/cleric-m.png';
			break;

		default:
			break;
	}
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
