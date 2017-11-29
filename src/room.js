import seedrandom from 'seedrandom';
import { Tile, FloorTile, WallTile, ExitTile } from './tile.js';
import Riddles from './riddle';
import Trap from './trap';
import GameObject from './gameobject';
import * as _ from 'lodash';

let tileTypes = {
	' ': null,
	'#': WallTile,
	'.': FloorTile,
	'E': ExitTile,
	'>': ExitTile,
	'<': ExitTile,
	'v': ExitTile,
	'^': ExitTile,
}

let shapeNames = ['square', 'cross'];

let shapes = {
	'square': [
		'                ',
		'#######^^#######',
		'#..............#',
		'#..............#',
		'#..............#',
		'#..............#',
		'#..............#',
		'<..............>',
		'<.......#......>',
		'#..............#',
		'#..............#',
		'#..............#',
		'#..........#...#',
		'#..............#',
		'#..............#',
		'#######vv#######',
	],
	'cross': [
		'                ',
		'      #^^#      ',
		'      #..#      ',
		'      #..#      ',
		'   ####..####   ',
		'   #........#   ',
		'####........####',
		'<..............>',
		'<.......#......>',
		'####........####',
		'   #........#   ',
		'   ####..####   ',
		'      #..#      ',
		'      #..#      ',
		'      #vv#      ',
		'                ',
	],
};

let riddles = new Riddles();

export default class Room extends GameObject {
	width = 16;
	height = 16;

	constructor(game, pos) {
		super(game);

		this.pos = pos;
		this.roomcode = this.game.map.rooms[pos.y][pos.x];

		// seed the rng
		seedrandom('seed' + this.pos.x + this.pos.y, { global: true });
		this._ = _.runInContext();

		this.monsters = [];
		this.tiles = [];

 	    this.riddle = riddles;
		this.trap;

		//Determine riddle or Trap
		//this.riddleTrap((roomcode[13]*100) + (roomcode[14]*10) + roomcode[15]);

		// parse roomcode
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
		this.shape = shapeNames[this._.random(0, 1)];//shapeNames[this.roomcode[1]];
		this.doors = {
			'^': this.roomcode[2],
			'>': this.roomcode[3],
			'v': this.roomcode[4],
			'<': this.roomcode[5],
		}

		// test room
		this.createByShape(this.shape);

		// init all tiles after the map has been created
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.width; y++) {
				if (this.tiles[y][x] !== null)
					this.tiles[y][x].init(x, y);
			}
		}
	}

	destroy() {
		// cleanup tiles
		for (let row of this.tiles) {
			for (let t of row) {
				if (t !== null)
					t.destroy();
			}
		}
	}

	createByShape(shape) {
		this.tiles = [];
		
		for (let row of shapes[shape]) {
			let new_row = [];

			for (let l of row) {
				let tile = tileTypes[l];

				if (tile === null) {
					new_row.push(null);
				} else if (tile == ExitTile) {
					if (this.doors[l] == 0) // check if there should be exit
						new_row.push(new WallTile(this));
					else
						new_row.push(new ExitTile(this));
				} else {
					new_row.push(new tile(this)); // instantiate
				}
			}

			this.tiles.push(new_row);			
		}
	}

	getTile(x, y) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height)
			return null;
		return this.tiles[y][x];
	}

	riddleTrap(index) {
		if(index >= 200) {
			this.trap = new Trap(index);
		} else {
			this.riddle = new Riddles(index);
		}
	}
	
	update() {
		if(this.riddle) {
			var choices = this.riddle.getChoices();
			var result;
			if(this.game.pressed['1']){
				result = this.riddle.update(choices.a);
			} else if (this.game.pressed['2']) {
				result = this.riddle.update(choices.b);
			} else if (this.game.pressed['3']) {
				result = this.riddle.update(choices.c);
			}
			if(result >= 0) this.riddle = undefined;
			// console.log(result);
		}
	}
}

export class SquareRoom extends Room {
	constructor(game, roomcode) {
		super(game, roomcode);
	}
}