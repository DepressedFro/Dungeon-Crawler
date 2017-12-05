import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import Monster from './monster.js';
import * as _ from 'lodash';

export default class Blob extends Monster {



	constructor(game, x, y) {
		super(game, x, y);

		this.helpAngle = 0;
		this.setTilePosition(1,13);
		this.friction = 0.91;
		this.burstSpeed = 150;
		this.currentState = "wait";
		this.waitTime = 300;
		this.timer = this.waitTime;
	}

	get BBox() {
		return {
			x: this.pos.x - 6,
			y: this.pos.y - 2,
			width: 10,
			height: 10,
		}
	}

	getRandomDirVector(mult = 1) {
		var dir = Math.random() * Math.PI * 2;
		var vec = new Vector(Math.cos(dir), -Math.sin(dir));
		vec.multiply(mult);
		return vec;
	}

	update(delta) {
		super.update(delta);
		var previous_pos = this.pos.clone();
		this.pos.add(Vector.multiply(this.speed, delta / 1000));
		this.speed.multiply(this.friction);

		this.helpAngle += this.speed.length()/400;

		var col = this.inTileCollision();
		if (col !== null) {
			this.pos = previous_pos.clone();
			// this.speed.negative();
			this.speed[col] *= -1;
		}

		this.timer -= delta;

		switch (this.currentState) {
			case "wait":
				if (this.timer <= 0) {
					this.speed = this.getRandomDirVector(this.burstSpeed * (Math.random() + 0.5));
					this.currentState = "move";
				}
				break;
			case "move":
				if (this.speed.length() <= 1) {
					this.timer = this.waitTime;
					this.currentState = "wait";
					this.speed = new Vector(0, 0);
				}
				break;
		}
	}

	render(ctx) {
		var tmpYTileSizeChanger = Constants.tileSize - Constants.tileSize*0.6;

		ctx.drawImage(
			Constants.tileset,
			this.xTile * Constants.tileSize,
			this.yTile * Constants.tileSize,
			Constants.tileSize,
			Constants.tileSize,
			Math.floor(this.pos.x - 8),
			Math.floor(this.pos.y - 8),
			Constants.tileSize,
			Math.floor(Constants.tileSize+tmpYTileSizeChanger*Math.sin(this.helpAngle)*this.speed.length()/this.burstSpeed)
		);
		//this.debugDrawBBox(ctx);
	}

	onDeath(){
		this.game.remove(this);
		//_.remove(this.game.monsters,this);		
	}

}
