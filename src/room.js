import { Tile, FloorTile, WallTile } from './tile.js';

/* [RA, RS, ND, ED, SD, WD, E1, E2, E3, E4, K, G, T, P1, P2, P3]
 * RA:Room Art Style
 * RS:Room Shape
 * ND:North Door
 * ED:East Door
 * SD:South Door
 * WD:West Door
 * E1:Enemy Count 1
 * E2:Enemy Count 2
 * E3:Enemy Count 3
 * E4:Enemy Count 4
 * K: Key
 * G: Gold/Treasure Type
 * P1:Puzzle/Riddle Index 1
 * P2:Puzzle/Riddle Index 2
 * P3:Puzzle/Riddle Index 3
 */
export default class Room {
	constructor(game, roomcode) {
		this.monsters = [];
		this.width = 16;
		this.height = 16;
		this.tiles = [[]];

		// test room
		for (var i = 0; i < this.width; i++) {
			this.tiles[0].push(new WallTile(game, i, 0));
		}

		for (var j = 1; j < this.height - 1; j++) {
			this.tiles.push([new WallTile(game, 0, j)]);
			for (var i = 1; i < this.width - 1; i++) {
				this.tiles[j].push(new FloorTile(game, i, j));
			}
			this.tiles[j].push(new WallTile(game, this.width - 1, j));
		}

		this.tiles.push([]);
		for (var i = 0; i < this.width; i++) {
			this.tiles[15].push(new WallTile(game, i, this.height - 1));
		}

		this.tiles[7][7].destroy();
		this.tiles[7][7] = new WallTile(game, 7, 7);
	}
}