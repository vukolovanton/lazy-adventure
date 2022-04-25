import { onMounted, ref } from 'vue';
import AuthService from '@/utils/auth/auth.service';
import PlayerService from '@/utils/auth/player.service';
import { Player } from '@/interfaces/Player';

import { usePlayerBaseInfo } from '@/store/palyerStats/playerBaseInfoStore';
import { usePlayerAdditionalInfo } from '@/store/palyerStats/playerAdditionalInfoStore';
import { usePlayerBaseStats } from '@/store/palyerStats/playerBaseStatsStore';
import { usePlayerSkillsStore } from '@/store/palyerStats/playerSkillsStore';
import { usePlayerSpellsStore } from '@/store/palyerStats/playerSpellsStore';
import { usePlayerInventoryStore } from '@/store/palyerStats/playerInventoryStore';

export function useFetchAndSetPlayerSheet() {
	const playerBaseInfoStore = usePlayerBaseInfo();
	const playerAdditionalInfoStore = usePlayerAdditionalInfo();
	const playerBaseStatsStore = usePlayerBaseStats();
	const playerSkillsStore = usePlayerSkillsStore();
	const playerSpellsStore = usePlayerSpellsStore();
	const playerInventoryStore = usePlayerInventoryStore();

	onMounted(() => {
		getPlayersSheet();
	});

	async function getPlayersSheet() {
		const currentUser = await AuthService.getCurrentUser();

		if (currentUser && currentUser.user.id) {
			const response = await PlayerService.fetchPlayer(currentUser.user.id);
			const result = await Promise.resolve(response);

			setSheetToStore(result);
		}
	}

	function setSheetToStore(player: Player) {
		if (Object.keys(player).length > 0) {
			playerBaseInfoStore.setPlayerBaseInfo(player.baseInfo);
			playerAdditionalInfoStore.setPlayerAdditionalInfo(player.additionalInfo);
			playerBaseStatsStore.setPlayerBaseStats(player.baseStats);
			playerSkillsStore.setPlayerSkills(player.skills);
			playerSpellsStore.setPlayerSpells(player.spells);
			playerInventoryStore.setPlayerInventory(player.inventory);
		}
	}
}
