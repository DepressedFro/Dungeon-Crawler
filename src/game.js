import Map from './map.js';
import Room from './room.js';
import Player from './player.js';
import Monster from './monster.js';
import Blob from './blob.js';
import * as _ from 'lodash';
import Riddles from './riddle';

export default class Game {
	constructor(screenWidth, screenHeight, context) {
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
		this.gameObjects = [];
		this.player = new Player(this);

		this.level = 1;
		this.map = new Map(9 + this.level, 1);
		this.room = new Room(this, this.map.rooms[this.playerlocx, this.playerlocy]);
		this.monsters = [new Blob(this, 100, 100)];

		// handle key presses
		this.pressed = {};
		window.onkeydown = (event) => { this.pressed[event.key] = true; };
		window.onkeyup = (event) => { this.pressed[event.key] = false; };

		this.gameStates = ["Main Menu", "Pause Menu", "Gameplay", "Game Over"];
		this.currentState = this.gameStates[0];

		this.lastTime = +new Date();
		window.requestAnimationFrame(() => { this.loop() });
	}

	movetoroom(locx, locy, dir) {
		this.room = new Room(this.map.rooms[locx, locy]);
		this.room.render(this.ctx);
	}

	add(obj) {
		this.gameObjects.push(obj);
		this.zindexChanged = true;
	}

	remove(obj) {
		this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);
	}

	update() {


		if(this.currentState === "Main Menu")
		{
			if(this.pressed['ArrowUp'])
			{

			}
			else if(this.pressed['ArrowDown'])
			{

			}
			else if(this.pressed['Enter'])
			{
				this.currentState = this.gameStates[2];
			}
		}
		else if(this.currentState === "Pause Menu")
		{
			if(this.pressed['Escape'])
			{
				this.currentState = this.gameStates[2];
			}
			else if(this.pressed['ArrowUp'])
			{

			}
			else if(this.pressed['ArrowDown'])
			{

			}
			else if(this.pressed['Enter'])
			{

			}
		}
		else if(this.currentState === "Gameplay")
		{
			let delta = +new Date() - this.lastTime;
			this.lastTime = +new Date();

			// loop backwards to handle object removal
			for (let i = this.gameObjects.length - 1; i > 0; i--) {
				this.gameObjects[i].update(delta);
			}
			this.room.update(this.pressed);
			if(this.pressed['Escape'])
			{
				this.currentState = this.gameStates[1];
			}
		}
		else if(this.currentState === "Game Over")
		{
			if(this.pressed['Enter'] || this.pressed['Space'])
			{

			}
		}

	}

	render() {

		if(this.currentState === "Main Menu")
		{

		}
		else if(this.currentState === "Pause Menu")
		{

		}
		else if(this.currentState === "Gameplay")
		{
			// reorder if zindex changed on some object
			if (this.zindexChanged) {
				this.gameObjects = _.sortBy(this.gameObjects, (obj) => { return obj.zindex });
				this.zindexChanged = false;
			}

			for (let obj of this.gameObjects) {
				this.ctx.save();
				obj.render(this.ctx);
				this.ctx.restore();
			}
		}
		else if(this.currentState === "Game Over")
		{

		}

	}

	loop() {
		this.update();
		this.render();
		window.requestAnimationFrame(() => { this.loop() });
	}
}
