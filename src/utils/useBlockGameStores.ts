import {storeToRefs} from 'pinia';
import {useCharacterMainInfo} from '@/store/palyerStats/characterMainInfoStore';
import {useCharacterBaseStatsStore} from '@/store/palyerStats/characterBaseStatsStore';
import {useGlobalStore} from '@/store/globalStore';
import {useTilesEditorStore} from '@/store/tilesEditorStore';
import {useCharacterHitPointsStore} from "@/store/palyerStats/characterHitPointsStore";
import {useCharacterAttacksStore} from "@/store/palyerStats/characterAttacks";
import {useCharacterSpellsStore} from "@/store/palyerStats/characterSpellsStore";

export function useBlockGameStores() {
    const globalStore = useGlobalStore();

    const characterMainInfoStore = useCharacterMainInfo();
    const {name, characterClass, level} = storeToRefs(characterMainInfoStore);

    const attactsStore = useCharacterAttacksStore();
    const {attacks} = storeToRefs(attactsStore);

    const spellsStore = useCharacterSpellsStore();
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
        attacks: attacks.value,
        spells: spells.value,
    };

    return {
        stats,
        characterName: name,
        selectedTileUrl,
    };
}
