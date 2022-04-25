export const SOCKET_IO_URL = 'http://localhost:3002';
export const SOCKET_IO_ROOM_NAME = 'dev';
export const GRID_SIZE = {
	WIDTH: 864,
	HEIGHT: 514,
	TILE: 32,
};

export enum StoreIds {
	GlobalStore = 'GlobalStore',
	PlayerAdditionalInfo = 'PlayerAdditionalInfo',
	PlayerBaseInfo = 'PlayerBaseInfo',
	PlayerBaseStats = 'PlayerBaseStats',
	PlayerInventory = 'PlayerInventory',
	PlayerSkills = 'PlayerSkills',
	PlayerSpells = 'PlayerSpells',
}
