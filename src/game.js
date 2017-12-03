import Map from './map.js';
import Room from './room.js';
import Player from './player.js';
import Monster from './monster.js';
import Blob from './blob.js';
import BigBlob from './bigblob.js';
import * as _ from 'lodash';
import Riddles from './riddle';

export default class Game {
	constructor(screenWidth, screenHeight, context, canvas) {
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
		this.gameObjects = [];
		this.canvas = canvas;
		// this.player = new Player(this);

		this.level = 1;
		this.map = new Map(9 + this.level, 1);
		this.room = new Room(this, {x: this.map.center, y: this.map.center});
		this.monsters = [new BigBlob(this, 100, 100), new BigBlob(this, 200, 200), new Blob(this, 200, 100), new Blob(this, 150, 200),new Blob(this, 100, 150),new Blob(this, 150, 150),new Blob(this, 200, 150)];
		this.player = new Player(this, 100, 50, 50);

		// handle key presses
		this.pressed = {};
		window.onkeydown = (event) => { this.pressed[event.key] = true; };
		window.onkeyup = (event) => { this.pressed[event.key] = false; };

		this.gameStates = ["Main Menu", "Pause Menu", "Gameplay", "Game Over"];
		this.currentState = this.gameStates[0];
		this.canvas.onmousedown = (event) => {this.pressed['mouse' + event.which] = true};
		this.canvas.onmouseup = (event) => {this.pressed['mouse' + event.which] = false};

		this.lastTime = +new Date();
		window.requestAnimationFrame(() => { this.loop() });
	}

	movetoroom(locx, locy) {
		this.room.destroy();
		this.room = new Room(this, {x: locx, y: locy});
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
