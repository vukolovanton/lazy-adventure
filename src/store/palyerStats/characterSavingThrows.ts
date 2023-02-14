import {defineStore} from 'pinia';
import {CharacterSavingThrowsStore, SavingThrowStoreItem} from '@/interfaces/PlayerSkills';
import {StoreIds} from '@/constants';
import {CharacterSheetSavingThrows, CharacterSheetProficiency} from "@/interfaces/CharacterSheet";

export const useCharacterSavingThrowsStore = defineStore(StoreIds.CharacterSavingThrows, {
    state: (): CharacterSavingThrowsStore => ({
        savingThrows: []
    }),

    actions: {
        setCharacterSavingThrows(characterSavingThrows: CharacterSheetSavingThrows, proficiency: CharacterSheetProficiency) {
            const result: SavingThrowStoreItem[] = [];

            Object.entries(characterSavingThrows).forEach(savingThrow => {
                const savingThrowName = savingThrow[0];
                const savingThrowValue = savingThrow[1];
                const savingThrowProficiency = proficiency[savingThrowName];

                if (savingThrowName !== 'characterId') {
                    result.push({
                        name: savingThrowName,
                        points: savingThrowValue,
                        isProficient: savingThrowProficiency,
                    } as SavingThrowStoreItem)
                }
            });
            this.savingThrows = result;
        },
        setSavingThrowPoints(savingThrow, action: string) {
            const index = this.savingThrows.findIndex((s) => s.name === savingThrow);
            if (action === '+') {
                this.savingThrows[index].points++;
            } else if (action === '-') {
                this.savingThrows[index].points--;
            }
        },
        setIsProficient(savingThrow, isProficient: boolean) {
            const index = this.savingThrows.findIndex((s) => s.name === savingThrow);
            this.savingThrows[index].isProficient = isProficient;
            },
    },

    persist: true,
});
