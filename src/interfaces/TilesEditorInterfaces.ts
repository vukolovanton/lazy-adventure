export type TilesSelection = Array<number>;

export type TilesCoordinates = {
	[key: string]: Array<number>;
};

export interface TilesSources {
	name: string;
	url: string;
}
