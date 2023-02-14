<template>
    <section class="CharacterAdditionalInfo">
        <div class="inner-container">
            <TextInputField
                    type="number"
                    label="Armor Class"
                    id="armorClass"
                    :inputValue="armorClass"
                    @update:inputValue="characterBaseStatsStore.setArmorClass"
            />
            <TextInputField
                    type="number"
                    label="Initiative"
                    id="initiative"
                    :inputValue="initiative"
                    @update:inputValue="characterBaseStatsStore.setInitiative"
            />
            <TextInputField
                    type="number"
                    label="Speed"
                    id="speed"
                    :inputValue="speed"
                    @update:inputValue="characterBaseStatsStore.setSpeed"
            />
        </div>
        <div class="inner-container">
            <TextInputField
                    type="number"
                    label="Current Hit Points"
                    id="currentHitPoints"
                    :inputValue="currentHitPoints"
                    @update:inputValue="characterHitPointsStore.setCurrentHitPoints"
            />
            <TextInputField
                    type="number"
                    label="Maximum Hit Points"
                    id="hitPointMaximum"
                    :inputValue="hitPointMaximum"
                    @update:inputValue="characterHitPointsStore.setHitPointsMaximum"
            />
            <TextInputField
                    type="number"
                    label="Temporary Hit Points"
                    id="temporaryHitPoints"
                    :inputValue="temporaryHitPoints"
                    @update:inputValue="characterHitPointsStore.setTemporaryHitPoints"
            />
        </div>

        <div class="inner-container">
            <TextInputField
                    label="Hit Dice"
                    id="hitDice"
                    :inputValue="hitDice"
                    @update:inputValue="characterHitPointsStore.setHitDice"
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
