import seedrandom from 'seedrandom';
import { Tile, FloorTile, WallTile, ExitTile, tileTypes, EnemyTile, TrapTile } from './tile.js';
import Riddles from './riddle';
import Trap from './trap';
import GameObject from './gameobject';
import * as _ from 'lodash';
import Constants from './constants.js';
import KnifeThrower from './knifethrower.js';
import BigBlob from './bigblob.js';
import Blob from './blob.js';
import Chest from './chest.js';
import SFX_Riddle_Correct from './sfx/sfx_riddle_correct.wav'
import SFX_Riddle_Incorrect from './sfx/sfx_riddle_incorrect.wav'

// let riddles = new Riddles();

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
		this.volumeSFXSlider = .6;
		this.check = false;
		this.monsters = [];
		this.tiles = [];
 	  this.riddle = new Riddles(game, this.roomcode[12], this.game.riddles);
		//if(this.roomcode[13])	this.trap = new Trap(game, this.roomcode[13]);
		//if(this.roomcode[13]) this.trap = new Trap(game, this.roomcode[13]);


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
		this.shape = Constants.shapeNames[this.roomcode[1]];//shapeNames[this.roomcode[1]];
		this.doors = {
			'^': this.roomcode[2],
			'>': this.roomcode[3],
			'v': this.roomcode[4],
			'<': this.roomcode[5],
		}

		this.chest = this.roomcode[11];

		// test room
		this.createByShape(this.shape);

		// init all tiles after the map has been created
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.width; y++) {
				if (this.tiles[y][x] !== null)
					this.tiles[y][x].init(x, y);
					if( this.tiles[y][x] instanceof EnemyTile){
						var tmp = Math.min(this.level,2);
						this.tiles[y][x].spawn(this._.random(0,this.game.level));
					}
			}
		}

		//sfx time
		this.sfx_riddle_correct = new Audio();
    this.sfx_riddle_correct.src = SFX_Riddle_Correct;
		this.sfx_riddle_incorrect = new Audio();
    this.sfx_riddle_incorrect.src = SFX_Riddle_Incorrect;
	  //end sfx
	}

	destroy() {
		// cleanup tiles
		for (let row of this.tiles) {
			for (let t of row) {
				if (t !== null)
					t.destroy();
			}
		}

		for (let m of this.monsters) {
			if (m !== null)
				m.destroy();
		}

		if(this.trap) {
			this.trap.destroy();
		}

		super.destroy();
	}

	createByShape(shape) {
		this.tiles = [];

		for (let row of Constants.shapes[shape]) {
			let new_row = [];

			for (let l of row) {
				let tile = tileTypes[l];

				if (tile === null) {
					new_row.push(null);
				} else if (tile == ExitTile) {
					if (this.doors[l] == 0) // check if there should be exit
						new_row.push(new WallTile(this));
					else
						new_row.push(new ExitTile(this, l));
				} else if (tile == TrapTile){
					if(this.roomcode[13]){
						new_row.push(new TrapTile(this,this.roomcode[13])); // instantiate
					}else{
						new_row.push(new FloorTile(this)); // instantiate
					}
				}else {
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
	update() {

		if(this.roomcode[12] && this.game.room === this) {
			var result = this.riddle.update(this.game.pressed);
			if(result || result === 0) {
				this.check = true;
				this.game.room.roomcode[12] = 0;
				this.riddle = undefined;
				this.game.player.health -= result;
				if(result === 0) {
					this.game.player.gold += 100;
					this.game.player.health += 25;
					var sound = this.sfx_riddle_correct.cloneNode();
					sound.volume = this.volumeSFXSlider;
					sound.play();
					if(this.game.player.health > 100) this.game.player.health = 100;
				}
				else {
					var sound = this.sfx_riddle_incorrect.cloneNode();
					sound.volume = this.volumeSFXSlider;
					sound.play();
				}


			}
		}
	}
}

export class SquareRoom extends Room {
	constructor(game, roomcode) {
		super(game, roomcode);
	}
}
