import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js'
import Constants from './constants.js';
import Monster from './monster.js';
/*****************************

TODO:

change speed according to delta time

******************************/


export default class Player extends GameObject {
	zindex = 10;

	constructor(game, health, x, y) {
		super(game);
		this.health = health;
		this.pos = new Vector(x, y);
		this.velocity = new Vector(0,0);
		this.speed_mult = 0.4;
		this.friction = 0.9;

		//for walking animation
		this.moveEffect = 0;
		//possible states : move, attack, block
		this.state = 'move';
		//how far will the player charge when attacking
		this.chargeSpeed = 8;
		//how far will the player move back when is hit by a monster
		this.knockBack = 1;

		this.damagedEffect = 0;
		this.damagedEffectSp = 0.95;

		//this.gold = 0;
		//this.class = 0;
		//this.className = "Warrior"; Make a new class in javascript for different type of Player 
	}

	inTileCollision() {
		var xx = Math.floor(this.pos.x / Constants.tileSize);
		var yy = Math.floor(this.pos.y / Constants.tileSize);

		// prioritize non-diagonal tiles
		for (let offset of [[0, 0], [-1, 0], [0, 1], [1, 0], [0, -1], [-1, 1], [-1, -1], [1, -1], [1, 1]]) {
			let tile = this.game.room.getTile(xx + offset[0], yy + offset[1]);
			if (tile === null)
				continue;

			tile.playerCollision(this);
			var col = this.collides(tile);
			if (!tile.passable && col !== null) {
				return col;
			}
		}

		return null;
	}

	get BBox() {
		return {
			x: this.pos.x - 4,
			y: this.pos.y,
			width: 8,
			height: 7,
		}
	}

	//checks collision at slightly different angle specified by i
	checkColSlightlyDifferent(i,steps){
		var dir = this.velocity.toAngles()+Math.PI/2*i/steps;
		var tmpPrevPos = this.pos.clone();
		this.pos.add(new Vector(Math.cos(dir),Math.sin(dir)).multiply(this.velocity.length()));
		
		var col = this.inTileCollision();
		var ret = false;

		if(col){
			ret = true;
			this.pos = tmpPrevPos;
		}
		return ret;
	}

	applyVelocity(){
		this.velocity.multiply(this.friction);
		//this.pos.add(this.velocity);

		var steps = 5;
		for(var i=0;i<steps;++i){
			if(!this.checkColSlightlyDifferent(i,steps)){
				break;
			} else if(!this.checkColSlightlyDifferent(-i,steps)){
				break;
			}
		}
	}

	moveState(){

		var l = this.game.pressed['a'] | 0;
		var r = this.game.pressed['d'] | 0;
		var u = this.game.pressed['w'] | 0;
		var d = this.game.pressed['s'] | 0;

		
		this.velocity.add(new Vector(r-l,d-u).normalize().multiply(this.speed_mult));
		this.applyVelocity();
	}

	changeToAttackHandle(){
		if(this.game.pressed['mouse1']){
			this.velocity.add(new Vector(this.game.mousePos.x-this.pos.x,this.game.mousePos.y-this.pos.y).normalize().multiply(this.chargeSpeed));
			this.state = 'attack';
		}
	}

	attackState(){
		this.applyVelocity();
		if(this.velocity.length() < 0.5){
			this.state = 'move';
		}
	}

	update(delta){

		var previous_pos = this.pos.clone();
		if(this.damagedEffect > 0.1){
			this.damagedEffect *= this.damagedEffectSp;
		}else{
			this.damagedEffect = 0;
		}

		switch(this.state){
			case 'move':
				this.moveEffect += this.velocity.length()/10;
				this.moveState();
				this.changeToAttackHandle();
			break;
			case 'attack':
				this.moveEffect = 0;
				this.attackState();
			break;
		}

		//collision checking

		for (var mon of this.game.gameObjects) {
			//assuming all monsters have almost square BBoxes
			if(mon instanceof Monster){
				if(mon.circleCollides(this)){
					switch(this.state){
						case 'move':
							this.pos = previous_pos;

							var tmp_knockback = new Vector(this.pos.x - mon.pos.x , this.pos.y - mon.pos.y).normalize();
							this.velocity = tmp_knockback.multiply(3);
							this.damagedEffect = 1;
							//mon.speed = tmp_knockback.negative().multiply(mon.knockBack);


						break;
						case 'attack':
							if(mon.invincible == 0){
								mon.onDeath();
							}
						break;
					}
				}
			}
		}

	}

	render(ctx) {


		ctx.save();
		if(this.velocity.x < 0){
			ctx.translate(Math.floor(this.pos.x - 8)+Constants.tileSize, Math.floor(this.pos.y - 12)-20*Math.sin(this.moveEffect)/30*this.velocity.length());
			ctx.scale(-1, 1+Math.sin(this.moveEffect)/30*this.velocity.length());
		}else{
			ctx.translate(Math.floor(this.pos.x - 8), Math.floor(this.pos.y - 12)-20*Math.sin(this.moveEffect)/30*this.velocity.length());
			ctx.scale(1, 1+Math.sin(this.moveEffect)/30*this.velocity.length());	
		}

		//player
		ctx.drawImage(
			Constants.tileset,
			14 * Constants.tileSize,
			15 * Constants.tileSize - 4,
			Constants.tileSize,
			Constants.tileSize + 4,
			0,
			0,
			Constants.tileSize,
			Constants.tileSize + 4
		);

		//just an effect, is visible when the player is hit
		if(this.damagedEffect > 0){
			ctx.globalAlpha = this.damagedEffect;
			//player
			ctx.drawImage(
				Constants.tileset,
				15 * Constants.tileSize,
				15 * Constants.tileSize - 4,
				Constants.tileSize,
				Constants.tileSize + 4,
				0,
				0,
				Constants.tileSize,
				Constants.tileSize + 4
			);
			ctx.globalAlpha = 1;
		}

		if(this.state == 'attack'){
			ctx.translate(22,14);
			ctx.rotate(Math.PI/2);
		}

		//sword
		ctx.drawImage(
			Constants.tileset,
			12 * Constants.tileSize,
			1 * Constants.tileSize - 6,
			Constants.tileSize,
			Constants.tileSize + 6,
			-6,
			0,
			Constants.tileSize,
			Constants.tileSize + 4
		);
		ctx.restore();
		//this.debugDrawBBox(ctx);
	}
}
