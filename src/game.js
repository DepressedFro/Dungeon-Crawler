import Map from './map.js';
import Room from './room.js';
import Player from './player.js';
import Monster from './monster.js';
import Thing from './thing.js';
import Blob from './blob.js';

export default class Game {
	constructor(screenWidth, screenHeight, context) {
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
		
		this.player = new Player(this);
				
		this.level = 1;
		this.map = new Map(9 + this.level, 1);
		this.room = new Room(this, this.map.rooms[this.playerlocx, this.playerlocy]);
		this.monsters = [new Blob(this,100,100)];
		this.things = [];
		
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);
		
		this.intervalrate = 1000/60.0;
		this.interval = setInterval(this.loop, this.intervalrate);
	}
	
	movetoroom(locx, locy, dir) {
		this.room = new Room(this.map.rooms[locx, locy]);
		this.monsters = this.room.monsters;
		this.things = this.room.things;
		this.room.render(this.ctx);
	}
	
	update() {
		this.room.update();		

		this.player.update();

		this.monsters.forEach((monster) => {
			monster.update();
		});	
		
		this.things.forEach((thing) => {
			thing.update();
		});
	
	}
	
	render() {
		this.room.render(this.ctx);

		this.player.render(this.ctx);
		
		this.monsters.forEach((monster) => {
			monster.render(this.ctx);
		});
	
		this.things.forEach((thing) => {
			thing.render(this.ctx);
		});
	
	}
	
	loop() {
		this.update();
		this.render();
	}
}