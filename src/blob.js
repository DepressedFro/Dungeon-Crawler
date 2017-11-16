import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import Monster from './monster.js';

export default class Blob extends Monster {
	constructor(game, x, y) {
		super(game, x, y);

		this.friction = 0.95;
		this.burstSpeed = 200;
		this.currentState = "wait";
		this.timer = 0;
		this.waitTime = 5;
	}

	get BBox() {
		return {
			x: this.pos.x - 6,
			y: this.pos.y - 2,
			width: 10,
			height: 10,
		}
	}

	inTileCollision() {
		var xx = Math.floor(this.pos.x / Constants.tileSize);
		var yy = Math.floor(this.pos.y / Constants.tileSize);

		for (var i = -1; i <= 1; ++i) {
			for (var ii = -1; ii <= 1; ++ii) {
				if (xx + i >= this.game.room.width ||
					yy + ii >= this.game.room.height ||
					xx + i < 0 ||
					yy + ii < 0)
					continue;

				var tile = this.game.room.tiles[yy + ii][xx + i];

				var col = tile.collides(this);
				if (!tile.passable && col !== null) {
					// tile.debugDrawBBox(this.game.ctx);
					// var now = new Date().getTime();
					// while(new Date().getTime() < now + 500){ /* do nothing */ } 
					return col;
				}
			}
		}

		return null;
	}

	getRandomDirVector(mult = 1) {
		var dir = Math.random() * Math.PI * 2;
		var vec = new Vector(Math.cos(dir), -Math.sin(dir));
		vec.multiply(mult);
		return vec;
	}

	update(delta) {
		var previous_pos = this.pos.clone();
		this.pos.add(Vector.multiply(this.speed, delta / 1000));
		this.speed.multiply(this.friction);

		var col = this.inTileCollision();
		if (col !== null) {
			this.pos = previous_pos.clone();
			this.speed.negative();
			//this.speed[col] *= -1;
		}

		this.timer -= delta;

		switch (this.currentState) {
			case "wait":
				if (this.timer <= 0) {
					this.speed = this.getRandomDirVector(this.burstSpeed);
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
		ctx.drawImage(
			Constants.tileset,
			1 * Constants.tileSize,
			13 * Constants.tileSize,
			Constants.tileSize,
			Constants.tileSize,
			Math.floor(this.pos.x - 8),
			Math.floor(this.pos.y - 8),
			Constants.tileSize,
			Constants.tileSize
		);
		this.debugDrawBBox(ctx);
	}

}