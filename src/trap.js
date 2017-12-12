import GameObject from './gameobject.js'
import Constants from './constants.js';
import Vector from './lib/vector2d.js';

export default class Trap extends GameObject {
	constructor(game, index, x, y) {
			super(game);
			this.zindex = 10;
      this.index = index;

			this.type;
      this.height;
      this.width;

			this.angle;
			this.pos = new Vector(x, y);
			this.tilex;
			this.tiley;

			this.start;
			this.fireInt;
      this.damage;

      this.determineTrap();
	}
	get BBox() {
		if(this.type === 'blade') {
			return {
				x: this.pos.x-8,
				y: this.pos.y-8,
				width: this.width,
				height: this.height,
			}
		}
		return {
			x: this.pos.x,
			y: this.pos.y,
			width: this.width,
			height: this.height,
		}
	}
	setTilePosition(tilex,tiley){
		this.tilex = tilex;
		this.tiley = tiley;
	}
	determineTrap() {
		//Generate a trap based on type.
		//Flame = 1, Spike = 2, Blade = 3;
		switch(this.index) {
			case 1:
				this.flame();
				break;
			case 2:
				this.spike();
				break;
			case 3:
				this.blade();
				break;
		}
	}
  flame() {
		this.tilex = 2;
		this.tiley = 13;

    this.height = 24;
    this.width = 16;
    this.damage = 5;
		this.type = 'flame';

		this.start = [this.pos.x, this.pos.x+3, this.pos.x+5.5];
		this.fireInt = [-0.75,-0.75,-0.75];
  }
  spike() {
		this.tilex = 8;
		this.tiley = 6;

    this.height = 32;
    this.width = 32;
    this.damage = 2;
		this.type = 'spike';
		this.start = 0;
		this.activate = false;
  }
  blade() {
		this.tilex = 11;
		this.tiley = 3;
		this.angle = 0;
    this.height = 16;
    this.width = 16;
    this.damage = 5;
		this.type = 'blade';
  }
  dealDamage() {
    //Deal damage, and any other interactions.
			if(this.type === 'spike') {
				this.activate = true;
			}

			return this.damage;
  }
	fireMove() {
		var value = this.pos.x+6;
		var value2 = this.pos.x-6;
		for(var i = 0; i<3; i++) {
			if(this.start[i] > value || this.start[i] < value2) {
				this.fireInt[i] *= -1;
			}
			this.start[i] += this.fireInt[i];
		}
	}
	render(ctx) {
		switch(this.index) {
			case 1:
			this.fireMove();
			for(var i = 0; i<3; i++) {
				ctx.drawImage(
					Constants.tileset,
					this.tilex * Constants.tileSize,
					this.tiley * Constants.tileSize,
					Constants.tileSize,
					Constants.tileSize,
					this.start[i],
					Math.floor(this.pos.y+Constants.tileSize*i*0.2),
					Constants.tileSize,
					Constants.tileSize
				);
			}
				break;
			case 2:
				if(this.activate) {
						for(var i = 0; i<2; i++) {
							for(var j = 0; j<2; j++) {
								ctx.drawImage(
									Constants.tileset,
									this.tilex * Constants.tileSize,
									this.tiley * Constants.tileSize,
									Constants.tileSize,
									this.start,
									this.pos.x+(Constants.tileSize*i),
									this.pos.y+(Constants.tileSize*j)+(16-this.start),
									Constants.tileSize,
									this.start
								);
							}
						}
					//Spike Animation
					if(this.start < 12) {
						this.start+= 0.8;
					}
				}
				break;
			case 3:
			ctx.save();
			ctx.translate(this.pos.x,this.pos.y);
			ctx.rotate(this.angle);
			this.angle+= 0.2;

			ctx.drawImage(
				Constants.tileset,
				this.tilex * Constants.tileSize,
				this.tiley * Constants.tileSize-10,
				Constants.tileSize,
				Constants.tileSize,
				Constants.tileSize/-2,
				Constants.tileSize/-2,
				Constants.tileSize,
				Constants.tileSize
			);

			ctx.restore();
				break;
		}
    //Render trap based on type.

	}
}
