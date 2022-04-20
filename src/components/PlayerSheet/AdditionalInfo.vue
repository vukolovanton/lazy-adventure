<template>
	<section class="AdditionalInfo">
		<div class="inner-container">
			<TextInputField
				type="number"
				label="Armor Class"
				id="armorClass"
				:input-value="armorClass"
				@set-input-value="store.setArmorClass"
			/>
			<TextInputField
				type="number"
				label="Initiative"
				id="initiative"
				:input-value="initiative"
				@set-input-value="store.setInitiative"
			/>
			<TextInputField
				type="number"
				label="Speed"
				id="speed"
				:input-value="speed"
				@set-input-value="store.setSpeed"
			/>
		</div>
		<div class="inner-container">
			<TextInputField
				type="number"
				label="Current Hit Points"
				id="currentHitPoints"
				:input-value="currentHitPoints"
				@set-input-value="store.setCurrentHitPoints"
			/>
			<TextInputField
				type="number"
				label="Maximum Hit Points"
				id="maximumHitPoints"
				:input-value="maximumHitPoints"
				@set-input-value="store.setMaximumHitPoints"
			/>
			<TextInputField
				type="number"
				label="Temporary Hit Points"
				id="temporaryHitPoints"
				:input-value="temporaryHitPoints"
				@set-input-value="store.setTemporaryHitPoints"
			/>
		</div>

		<div class="inner-container">
			<TextInputField
				label="Hit Dice"
				id="hitDice"
				:input-value="hitDice"
				@set-input-value="store.setHitDice"
			/>
			<div>
				<div>
					<input
						v-for="(success, index) in successes"
						type="checkbox"
						value="success"
						:checked="success"
						@change="store.setDeathSaves(0, index, $event.target?.checked)"
					/>
					<span>Successes</span>
				</div>
				<div>
					<input
						v-for="(failure, index) in failures"
						type="checkbox"
						:value="failure"
						:checked="failure"
						@change="store.setDeathSaves(1, index, $event.target?.checked)"
					/>
					<span>Failures</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import TextInputField from '@/components/common/TextInputField.vue';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';

const store = usePlayerAdditionalInfo();
const {
	armorClass,
	initiative,
	speed,
	currentHitPoints,
	maximumHitPoints,
	temporaryHitPoints,
	hitDice,
	deathSaves,
} = storeToRefs(store);

const successes = deathSaves.value[0];
const failures = deathSaves.value[1];
</script>

<style lang="scss" scoped>
.inner-container {
	display: flex;
	justify-content: space-between;

	// & .checkbox-container {
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: flex-start;
	// 	margin-right: 1rem;
	// }
}
</style>
