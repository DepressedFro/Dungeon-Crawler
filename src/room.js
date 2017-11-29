import { Tile, FloorTile, WallTile, ExitTile } from './tile.js';
import Riddles from './riddle';
import Trap from './trap';
import GameObject from './gameobject';

let tileTypes = {
	' ': null,
	'#': WallTile,
	'.': FloorTile,
	'E': ExitTile,
}

let shapeNames = ['square', 'cross'];

let shapes = {
	'square': [
		'                ',
		'#######EE#######',
		'#..............#',
		'#..............#',
		'#..............#',
		'#..............#',
		'#..............#',
		'E..............E',
		'E.......#......E',
		'#..............#',
		'#..............#',
		'#..............#',
		'#..........#...#',
		'#..............#',
		'#..............#',
		'#######EE#######',
	],
	'cross': [
		'                ',
		'      #EE#      ',
		'      #..#      ',
		'      #..#      ',
		'   ####..####   ',
		'   #........#   ',
		'####........####',
		'E..............E',
		'E.......#......E',
		'####........####',
		'   #........#   ',
		'   ####..####   ',
		'      #..#      ',
		'      #..#      ',
		'      #EE#      ',
		'                ',
	],
};


export default class Room extends GameObject {
	width = 16;
	height = 16;

	constructor(game, pos) {
		super(game);

		this.pos = pos;
		this.roomcode = this.game.map.rooms[pos.y][pos.x];
		this.monsters = [];
		this.width = 16;
		this.height = 16;
		this.tiles = [[]];
 	    this.riddle = new Riddles();
		this.trap;

		//Determine riddle or Trap
		//this.riddleTrap((roomcode[13]*100) + (roomcode[14]*10) + roomcode[15]);

		// test room
		this.createByShape('cross');

		// init all tiles after the map has been created
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.width; y++) {
				if (this.tiles[y][x] !== null)
					this.tiles[y][x].init(x, y);
			}
		}
	}

	createByShape(shape) {
		this.tiles = [];
		for (let row of shapes[shape]) {
			let new_row = [];
			for (let l of row) {
				let tile = tileTypes[l];
				if (tile !== null)
					tile = new tile(this); // instantiate
				new_row.push(tile);
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