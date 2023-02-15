<template>
	<section class="SavingThrows">
        <h3>Saving Throws</h3>
        <div class="saving-throws-grid">
		<div v-for="savingThrow in savingThrows" class="saving-throws-container">
        <div>
			<input
				type="checkbox"
				:id="savingThrow.name"
				:checked="savingThrow.isProficient"
				@change="store.setIsProficient(savingThrow.name, $event.target?.checked)"
			/>
			<label :for="savingThrow.name">{{ savingThrow.name }}</label>
            </div>
			<div class="saving-throws-controlls">
				<span>{{ savingThrow.points }}</span>
				<div>
					<button @click="store.setSavingThrowPoints(savingThrow.name, '-')">-</button>
					<button @click="store.setSavingThrowPoints(savingThrow.name, '+')">+</button>
				</div>
			</div>
		</div>
        </div>
	</section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import {useCharacterSavingThrowsStore} from "@/store/palyerStats/characterSavingThrows";

const store = useCharacterSavingThrowsStore();
const { savingThrows } = storeToRefs(store);

</script>

<style lang="scss" scoped>
.SavingThrows {
	grid-area: SavingThrows;
}
.saving-throws-grid {
    display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px 25px;
  grid-template-areas:
    ". ."
    ". ."
    ". .";
}
.saving-throws-container {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.saving-throws-controlls {
	display: flex;
	justify-content: space-between;
	align-items: center;

	& > span:first-child {
		padding: 0 0.7em;
		font-weight: bold;
	}

	& > span:last-child {
		padding: 0 0.7em;
		font-size: 0.8em;
		opacity: 0.5;
	}
}
</style>
