<template>
	<div v-for="user in props.users">
		<div v-if="user.details.stats.isPlayer" class="connected-player-wrapper">
			<div class="base-info">
				<h3>
					{{ user.username }}
				</h3>
				<span
					>{{ user.details.stats.characterClass }},
					{{ user.details.stats.level }} lvl</span
				>
				<div class="details">
					<span
						>{{ user.details.stats.currentHitPoints }} /
						{{ user.details.stats.maximumHitPoints }} Hit Points</span
					>
					<span>{{ user.details.stats.initiative }} Initiative</span>
					<span>{{ user.details.stats.speed }} Speed</span>
				</div>
			</div>
			<div class="items">
				<h4>Inventory:</h4>
				<div
					v-for="item in user.details.stats.inventory"
					v-if="user.details.stats.inventory.length > 0"
					class="item"
				>
					<span> {{ item.count }}x {{ item.name }}</span>
				</div>

				<h4>Spells:</h4>
				<div
					v-for="spell in user.details.stats.spells"
					v-if="user.details.stats.spells.length > 0"
					class="item"
				>
					<span> {{ spell.name }} - </span>
					<span> {{ spell.attack }} / {{ spell.dice }} / {{ spell.type }}</span>
				</div>
			</div>
		</div>
		<ActiveMonsters
			v-else
			:user="user"
			:handleDeleteMonster="handleDeleteMonster"
			:handleUpdateMonsterHitPoints="handleUpdateMonsterHitPoints"
		/>
	</div>
</template>

<script lang="ts" setup>
import ActiveMonsters from './ActiveMonsters.vue';
const props = defineProps([
	'users',
	'handleDeleteMonster',
	'handleUpdateMonsterHitPoints',
]);
</script>

<style lang="scss" scoped>
.connected-player-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	gap: 20px;
	margin-bottom: 40px;

	& > .base-info {
		& > .details {
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
