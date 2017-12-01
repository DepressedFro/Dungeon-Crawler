import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js'

export default class Player extends GameObject {
	constructor(game, health, x, y) {
		super(game);
		this.health = health;
		this.pos = new Vector(x, y);
		this.velocity = new Vector(0,0);
		this.speed = 3;
		this.gold = 0;
		this.class = 0;
		this.className = "Warrior";
	}

	mouseDown(event){
		switch(event.which){
			//Left click action
			case 1:
				switch(this.class){
					//Left click is Sword attack for Warriors
					case 0:
						break;
				}
				break;
			//Right click action
			case 3:
				switch(this.class){
					//Right click is Block for Warriors
					case 0:
						break;
				}
				break;
		}
	}
	inTileCollision() {
		var xx = Math.floor(this.pos.x / Constants.tileSize);
		var yy = Math.floor(this.pos.y / Constants.tileSize);

		// prioritize non-diagonal tiles
		for (let offset of [[0, 0], [-1, 0], [0, 1], [1, 0], [0, -1], [-1, 1], [-1, -1], [1, -1], [1, 1]]) {
			let tile = this.game.room.getTile(xx + offset[0], yy + offset[1]);
			if (tile === null)
				continue;

			var col = this.collides(tile);
			if (!tile.passable && col !== null) {
				// tile.debugDrawBBox(this.game.ctx);
				// var now = new Date().getTime();
				// while(new Date().getTime() < now + 500){ /* do nothing */ }
				return col;
			}
		}

		return null;
	}

	get BBox() {
		return {
			x: this.pos.x - 6,
			y: this.pos.y - 8,
			width: 12,
			height: 17,
		}
	}

	update(delta){
		var previous_pos = this.pos.clone();

		if(this.game.pressed['a']){
			if(this.game.pressed['s']){
				this.pos.x += -this.speed;
				this.pos.y += this.speed;
			} else if (this.game.pressed['w']){
				this.pos.x += -this.speed;
				this.pos.y += -this.speed;
			} else{
				this.pos.x += -this.speed;
			}
		} else if (this.game.pressed['d']) {
			if(this.game.pressed['s']){
				this.pos.x += this.speed;
				this.pos.y += this.speed;
			} else if (this.game.pressed['w']){
				this.pos.x += this.speed;
				this.pos.y += -this.speed;
			} else{
				this.pos.x += this.speed;
			}
		} else if (this.game.pressed['s']) {
			this.pos.y += this.speed;
		} else if (this.game.pressed['w']){
			this.pos.y += -this.speed;
		}

		var col = this.inTileCollision();
		if (col !== null) {
			this.pos = previous_pos.clone();
		}
	}

	render(ctx) {
		ctx.drawImage(
			Constants.tileset,
			14 * Constants.tileSize,
			15 * Constants.tileSize - 4,
			Constants.tileSize,
			Constants.tileSize + 4,
			Math.floor(this.pos.x - 8),
			Math.floor(this.pos.y - 12),
			Constants.tileSize,
			Constants.tileSize + 4
		);
		this.debugDrawBBox(ctx);
	}
}
