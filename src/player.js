import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js'

export default class Player extends GameObject {
	constructor(game, health, x, y) {
		super(game);
		this.health = health;
		this.pos = {x: x, y: y};
		this.velocity = {x: 0, y: 0};
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

	get BBox() {
		return {
			x: this.pos.x - 6,
			y: this.pos.y - 8,
			width: 12,
			height: 17,
		}
	}

	update(delta){

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
