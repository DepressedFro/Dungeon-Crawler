import Map from './map.js';
import Room from './room.js';
import Player from './player.js';
import Monster from './monster.js';
import Blob from './blob.js';
import BigBlob from './bigblob.js';
import * as _ from 'lodash';
import * as Papa from "papaparse";
import Riddles from './riddles.csv';
import Menu_Title from './menu_title';
import Menu_Main from './menu_main';
import KnifeThrower from './knifethrower.js';
import ThrownKnife from './thrownknife.js';
import Chest from './chest.js';
import Music_Menu from './songs/Main_Menu.wav';
import SFX_Slash from './sfx/sfx_player_warrior_sword_hit.wav'
export default class Game {
	constructor(screenWidth, screenHeight, context, canvas) {
		//this.monsters = [];
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
		this.canvas = canvas;
		this.gameObjects = [];
		this.toRemove = [];
		this.shakeMag = 0;

		this.level = 1;
		this.initMap();
		this.movecd = 0;
		this.menu_title = new Menu_Title();
		this.menu_main = new Menu_Main();
		this.riddles;

		//bind functions for easy passing
		this.grabRiddles = this.grabRiddles.bind(this);
		this.setRiddles = this.setRiddles.bind(this);
    this.grabRiddles(this.setRiddles);

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
		this.gameStates = ["Title Screen", "Main Menu", "Pause Menu", "Gameplay", "Game Over", "Exit"];
		window.currentState = this.gameStates[0];
		this.cooldown = 100;
		this.key_cd = this.cooldown;

		this.volumeSFXSlider = 0;
		//music time
		this.song_menu  = new Audio();
    this.song_menu.src = Music_Menu;
		this.song_menu.volume = this.volumeSFXSlider;
		this.song_menu.play()

		//end music time

		this.lastTime = +new Date();
		window.requestAnimationFrame(() => { this.loop() });
	}
	//reads in the data and then calls a setter function
		grabRiddles(callBack)
		{
			//use library to grab riddles
			Papa.parse(Riddles,
			{
		    download: true,
		    delimiter: ',',
				header: true,
				dynamicTyping: true,
		    complete: function(results)
				{
		        callBack(results.data);
		    }
			});
		}

	//sets the riddles array to be equal the read in data
		setRiddles(results)
		{
			this.riddles = results;
		}

	initMap() {
		this.map = new Map(9 + this.level, this.level);
		this.room = new Room(this, {
			x: this.map.startx >= 0 ? this.map.startx : this.map.center,
			y: this.map.starty >= 0 ? this.map.starty : this.map.center
		});
	}

	mousemove(event) {
		let rect = this.canvas.getBoundingClientRect();
		let x = Math.floor((event.clientX - rect.left) / this.canvas.offsetWidth * this.canvas.width);
		let y = Math.floor((event.clientY - rect.top) / this.canvas.offsetHeight * this.canvas.height);
		this.mousePos = { x, y };
	}

	movetoroom(locx, locy) {
		/*for(var i=0; i<this.gameObjects.length; ++i){
			if(this.gameObjects[i] instanceof Chest){
				this.gameObjects[i].destroy();
			}
		}*/
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
		this.toRemove.push(obj);
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

			// remove destroyed objects
			for (let obj of this.toRemove) {
				this.gameObjects.splice(this.gameObjects.indexOf(obj), 1);
			}
			this.toRemove = [];

			if (this.pressed['Escape'] && this.key_cd <= 0)
			{
				window.currentState = this.gameStates[2];
				this.key_cd = this.cooldown;
			}

		}
		else if (window.currentState === "Game Over")
		{
			if (this.pressed['Enter'] || this.pressed['Space']) {
				window.location.reload();
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

			document.getElementById("gold").textContent = "Gold: " + this.player.gold;

			for (let obj of this.gameObjects) {
				this.ctx.save();
				obj.render(this.ctx);
				this.ctx.restore();
			}

			this.ctx.fillStyle = "red";
			this.ctx.fillRect((this.width)-110, 20, (this.player.health), 10);

		}
		else if (window.currentState === "Game Over") {

			document.getElementById("gold").textContent = "";
			document.getElementById("gameOver").textContent = "You Are Dead!";

			var temp = ['level', 'goldS', 'monster'];
			var count = 0;
			var content = ["Level: " + this.level, "Gold: " + this.player.gold, "Monsters Killed: "  + this.player.kill];

			//Loop to add in text.
			temp.forEach(function(i){
			  var temp2 = document.getElementById(i);
			  temp2.textContent = content[count];
				count++;
			});


		}
		this.ctx.restore();
	}

	loop() {
		this.update();
		this.render();
		window.requestAnimationFrame(() => { this.loop() });
	}
}
