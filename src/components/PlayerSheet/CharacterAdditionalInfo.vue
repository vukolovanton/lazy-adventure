<template>
    <section class="CharacterAdditionalInfo">
        <div class="inner-container">
            <TextInputField
                    type="number"
                    label="Armor Class"
                    id="armorClass"
                    :input-value="armorClass"
                    @set-input-value="characterBaseStatsStore.setArmorClass"
            />
            <TextInputField
                    type="number"
                    label="Initiative"
                    id="initiative"
                    :input-value="initiative"
                    @set-input-value="characterBaseStatsStore.setInitiative"
            />
            <TextInputField
                    type="number"
                    label="Speed"
                    id="speed"
                    :input-value="speed"
                    @set-input-value="characterBaseStatsStore.setSpeed"
            />
        </div>
        <div class="inner-container">
            <TextInputField
                    type="number"
                    label="Current Hit Points"
                    id="currentHitPoints"
                    :input-value="currentHitPoints"
                    @set-input-value="characterHitPointsStore.setCurrentHitPoints"
            />
            <TextInputField
                    type="number"
                    label="Maximum Hit Points"
                    id="hitPointMaximum"
                    :input-value="hitPointMaximum"
                    @set-input-value="characterHitPointsStore.setHitPointsMaximum"
            />
            <TextInputField
                    type="number"
                    label="Temporary Hit Points"
                    id="temporaryHitPoints"
                    :input-value="temporaryHitPoints"
                    @set-input-value="characterHitPointsStore.setTemporaryHitPoints"
            />
        </div>

        <div class="inner-container">
            <TextInputField
                    label="Hit Dice"
                    id="hitDice"
                    :input-value="hitDice"
                    @set-input-value="characterHitPointsStore.setHitDice"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import {storeToRefs} from 'pinia';
import TextInputField from '@/components/common/TextInputField.vue';
import {useCharacterBaseStatsStore} from '@/store/palyerStats/characterBaseStatsStore';
import {useCharacterHitPointsStore} from "@/store/palyerStats/characterHitPointsStore";

const characterBaseStatsStore = useCharacterBaseStatsStore();
const characterHitPointsStore = useCharacterHitPointsStore();
const {
    armorClass,
    initiative,
    speed,
} = storeToRefs(characterBaseStatsStore);
const {
    hitPointMaximum,
    currentHitPoints,
    temporaryHitPoints,
    hitDice,
} = storeToRefs(characterHitPointsStore);
</script>

<style lang="scss" scoped>
.inner-container {
  display: flex;
  justify-content: space-between;
}
</style>
