import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js'
import Constants from './constants.js';
import Arrow from './arrow.js';

export default class Player extends GameObject {
	zindex = 10;

	constructor(game, health, x, y) {
		super(game);
		this.health = health;
		this.pos = new Vector(x, y);
		this.velocity = new Vector(0,0);
		this.speed = 3;
		this.gold = 0;
		this.class = 0;
		this.className = "Warrior";
		this.arrows = [];
	}

	//Checks to see if player collides with a tile
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

	//Create player collision box
	get BBox() {
		return {
			x: this.pos.x - 4,
			y: this.pos.y,
			width: 8,
			height: 7,
		}
	}

	//Attack event
	attack(mx, my){
		this.arrows.push(new Arrow(this.pos, new Vector(mx,my)));
	}

	update(delta){
		//Update Player collision
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

		//Sees if player can move to the location
		var col = this.inTileCollision();
		if (col !== null) {
			this.pos = previous_pos.clone();
		}

		//Handles mouse events
		if(this.game.pressed['mouse1']){
			this.attack(this.game.mousePos.x, this.game.mousePos.y);
		}

		for(var i = 0; i < this.arrows.length; i++){
			this.arrows[i].update(delta);
			if(this.arrows[i].remove){
				this.arrows.splice(i,1);
			}
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
		for(var i = 0; i < this.arrows.length; i++){
			this.arrows[i].render(ctx);
		}
		// this.debugDrawBBox(ctx);

	}
}
