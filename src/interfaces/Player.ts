import { SkillStoreItem } from './PlayerSkills';
import { Spell } from './PlayerSpells';
import { InventoryItem } from './PlayerInventory';
import {
	PlayerBaseInfo,
	PlayerAdditionalInfo,
	PlayerBaseStats,
} from './PlayerStats';

export interface Player {
	userId: string;
	baseInfo: PlayerBaseInfo;
	additionalInfo: PlayerAdditionalInfo;
	baseStats: PlayerBaseStats;
	skills: SkillStoreItem[];
	spells: Spell[];
	inventory: InventoryItem[];
}
