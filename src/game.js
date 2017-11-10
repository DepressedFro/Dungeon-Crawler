import Map from './map.js';
import Room from './room.js';

export default class Game {
	constructor(screenWidth, screenHeight, context) {
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
		
		this.player;
		this.playerhealth = 100;
		this.playergold = 0;
		this.playerlocx = 5;
		this.playerlocy = 5;
		
		this.level = 1;
		this.map = new Map(9 + this.level);
		this.room = new Room(this.map.rooms[this.playerlocx, this.playerlocy]);
		this.monsters = [];
	}
	
	movetoroom(locx, locy, dir) {
		this.room = new Room(this.map.rooms[locx, locy]);
		this.monsters = this.room.monsters;
	}
	
	
}