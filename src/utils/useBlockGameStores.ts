import {storeToRefs} from 'pinia';
import {useCharacterMainInfo} from '@/store/palyerStats/characterMainInfoStore';
import {useCharacterBaseStatsStore} from '@/store/palyerStats/characterBaseStatsStore';
import {usePlayerInventoryStore} from '@/store/palyerStats/playerInventoryStore';
import {usePlayerSpellsStore} from '@/store/palyerStats/playerSpellsStore';
import {useGlobalStore} from '@/store/globalStore';
import {useTilesEditorStore} from '@/store/tilesEditorStore';
import {useCharacterHitPointsStore} from "@/store/palyerStats/characterHitPointsStore";

export function useBlockGameStores() {
    const globalStore = useGlobalStore();

    const playerBaseInfoStore = useCharacterMainInfo();
    const {characterName, characterClass, level} =
        storeToRefs(playerBaseInfoStore);

    const inventoryStore = usePlayerInventoryStore();
    const {inventory} = storeToRefs(inventoryStore);

    const spellsStore = usePlayerSpellsStore();
    const {spells} = storeToRefs(spellsStore);

    const tilesStore = useTilesEditorStore();
    const {selectedTileUrl} = storeToRefs(tilesStore);

    const characterHitPointsStore = useCharacterHitPointsStore();
    const {
        currentHitPoints,
        hitPointMaximum,
        temporaryHitPoints,
        hitDice
    } = storeToRefs(characterHitPointsStore);

    const store = useCharacterBaseStatsStore();
    const {
        initiative,
        speed
    } = storeToRefs(store);

    const stats = {
        characterClass: characterClass.value,
        level: level.value,
        initiative: initiative.value,
        speed: speed.value,
        currentHitPoints: currentHitPoints.value,
        maximumHitPoints: hitPointMaximum.value,
        temporaryHitPoints: temporaryHitPoints.value,
        hitDice: hitDice.value,
        attacks: inventory.value,
        spells: spells.value,
    };

    return {
        stats,
        characterName,
        selectedTileUrl,
    };
}
