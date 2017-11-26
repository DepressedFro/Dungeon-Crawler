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
		this.game = game;
		this.monsters = [];
		this.width = 16;
		this.height = 16;
		this.tiles = [[]];

		// test room
		for (var i = 0; i < this.width; i++) {
			this.tiles[0].push(null);
		}

		this.tiles.push([]);		
		for (var i = 0; i < this.width; i++) {
			this.tiles[1].push(new WallTile(this));
		}

		for (var j = 2; j < this.height - 1; j++) {
			this.tiles.push([new WallTile(this)]);
			for (var i = 1; i < this.width - 1; i++) {
				this.tiles[j].push(new FloorTile(this));
			}
			this.tiles[j].push(new WallTile(this));
		}

		this.tiles.push([]);
		for (var i = 0; i < this.width; i++) {
			this.tiles[15].push(new WallTile(this));
		}

		this.tiles[7][7].destroy();
		this.tiles[7][7] = new WallTile(this);
		this.tiles[7][12].destroy();
		this.tiles[7][12] = new WallTile(this);

		this.tiles[7][0].destroy();
		this.tiles[7][0] = new FloorTile(this);
		this.tiles[8][0].destroy();
		this.tiles[8][0] = new FloorTile(this);

		this.tiles[7][15].destroy();
		this.tiles[7][15] = new FloorTile(this);
		this.tiles[8][15].destroy();
		this.tiles[8][15] = new FloorTile(this);

		// init all tiles after the map has been created
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.width; y++) {
				if (this.tiles[y][x] !== null)
					this.tiles[y][x].init(x, y);
			}
		}
	}

	getTile(x, y) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height)
			return null;
		return this.tiles[y][x];
	}
}