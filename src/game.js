import Map from './map.js';
import Room from './room.js';
import Player from './player.js';
import Monster from './monster.js';
import Blob from './blob.js';
import BigBlob from './bigblob.js';
import * as _ from 'lodash';
import Riddles from './riddle';
import Menu_Title from './menu_title';
import Menu_Main from './menu_main';
import KnifeThrower from './knifethrower.js';
import ThrownKnife from './thrownknife.js';

export default class Game {
	constructor(screenWidth, screenHeight, context, canvas) {
		//this.monsters = [];
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
		this.canvas = canvas;
		this.gameObjects = [];
		this.shakeMag = 0;

		this.level = 1;
		this.map = new Map(9 + this.level, 1);
		this.room = new Room(this, {
			x: this.map.startx >= 0 ? this.map.startx : this.map.center,
			y: this.map.starty >= 0 ? this.map.starty : this.map.center
		});
		this.movecd = 0;
		this.monsters = [new BigBlob(this, 100, 100), new BigBlob(this, 200, 200), new Blob(this, 200, 100), new Blob(this, 150, 200), new Blob(this, 100, 150), new Blob(this, 150, 150), new Blob(this, 200, 150)];
		this.menu_title = new Menu_Title(this);
		this.menu_main = new Menu_Main(this);

		if (this.room.shape === "down")
			this.player = new Player(this, 100, 60, 60);
		else
			this.player = new Player(this, 100, 128, 128);

		// handle key presses
		this.pressed = {};
		window.onkeydown = (event) => { this.pressed[event.key] = true; };
		window.onkeyup = (event) => { this.pressed[event.key] = false; };

		window.onmousedown = (event) => { this.pressed['mouse' + event.which] = true };
		window.onmouseup = (event) => { this.pressed['mouse' + event.which] = false };
		window.onmousemove = (event) => { this.mousemove(event) };
		this.mousePos = { x: 0, y: 0 };

		//states the game can be in
		this.gameStates = ["Title Screen", "Main Menu", "Pause Menu", "Gameplay", "Scoreboard", "Game Over", "Exit"];
		window.currentState = this.gameStates[0];
		this.cooldown = 100;
		this.key_cd = this.cooldown;


		this.lastTime = +new Date();
		window.requestAnimationFrame(() => { this.loop() });
	}

	mousemove(event) {
		let rect = this.canvas.getBoundingClientRect();
		let x = Math.floor((event.clientX - rect.left) / this.canvas.offsetWidth * this.canvas.width);
		let y = Math.floor((event.clientY - rect.top) / this.canvas.offsetHeight * this.canvas.height);
		this.mousePos = { x, y };
	}

	movetoroom(locx, locy) {
		for(var i=0; i<this.gameObjects.length; ++i){
			if(this.gameObjects[i] instanceof Monster || this.gameObjects[i] instanceof ThrownKnife){
				this.remove(this.gameObjects[i]);
				--i;
			}
		}
		//this.monsters = [];
		this.room.destroy();
		this.room = new Room(this, { x: locx, y: locy });
		this.movecd = 200;
	}

	shake(magnitude) {
        this.shakeMag += magnitude;
    }

	add(obj) {
		this.gameObjects.push(obj);
		this.zindexChanged = true;
	}

	remove(obj) {
		this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);
	}

	update() {
		let delta = +new Date() - this.lastTime;
		//console.log(delta);
		this.lastTime = +new Date();
		//ensures that you don't press a button more than you want
		this.movecd -= delta;
		this.key_cd -= delta;
		this.shakeMag *= 0.90;

		if (window.currentState === "Title Screen")
		{
			this.menu_title.update(this.pressed);
			if (this.pressed['Enter'])
			{
				window.currentState = this.gameStates[1];
				this.pressed['Enter'] = false;
				this.key_cd = this.cooldown;
			}
		}
		else if (window.currentState === "Main Menu")
		{
			this.menu_main.update(this.pressed);
		}
		else if (window.currentState === "Pause Menu") {
			if (this.pressed['Escape'] && this.key_cd <= 0) {
				window.currentState = this.gameStates[3];
				this.key_cd = this.cooldown;
			}
			else if (this.pressed['ArrowUp']) {

			}
			else if (this.pressed['ArrowDown']) {

			}
			else if (this.pressed['Enter']) {

			}
		}
		else if (window.currentState === "Gameplay")
		{
			// loop backwards to handle object removal
			for (let i = this.gameObjects.length - 1; i > 0; i--) {
				if (this.gameObjects[i])
					this.gameObjects[i].update(delta);
			}

			if(this.player.health <= 0) {
				window.currentState = this.gameStates[4];
				this.player.health = 0;
			}

			if (this.pressed['Escape'] && this.key_cd <= 0)
			{
				window.currentState = this.gameStates[2];
				this.key_cd = this.cooldown;
			}

		}
		else if (window.currentState === "Scoreboard")
		{

		}
		else if (window.currentState === "Game Over")
		{
			if (this.pressed['Enter'] || this.pressed['Space']) {

			}
		}
		else if (window.currentState === "Exit")
		{
			//do nothing right now
		}

	}

	render() {
		this.ctx.save();

		// clear the screen
		this.ctx.translate(Math.round(Math.random() * this.shakeMag), Math.round(Math.random() * this.shakeMag));
		this.ctx.fillStyle = '#1c1117';
		this.ctx.fillRect(-200, -200, this.width + 400, this.height + 400);

		if (window.currentState === "Title Screen")
		{
			this.menu_title.render(this.ctx);
		}
		else if (window.currentState === "Main Menu") {
			this.menu_main.render(this.ctx);
		}
		else if (window.currentState === "Pause Menu")
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
		else if (window.currentState === "Gameplay") {
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
		else if (window.currentState === "Game Over") {
			this.ctx.fillStyle = "red";
			this.ctx.fillText("You Are Dead!", this.width/2, 100);
		}
		this.ctx.fillStyle = "red";
		this.ctx.fillRect((this.width)-110, 20, (this.player.health), 10);

		this.ctx.fillStyle = "gold";
		this.ctx.fillText("Gold: " + this.player.gold, 10, 30);

		this.ctx.restore();
	}

	loop() {
		this.update();
		this.render();
		window.requestAnimationFrame(() => { this.loop() });
	}
}
