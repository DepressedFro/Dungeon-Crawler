import GameObject from './gameobject.js'
import Constants from './constants.js';

export default class Trap extends GameObject {
	constructor(game, index) {
			super(game);
      this.index = index;

			this.type;
      this.height;
      this.width;

			this.angle;
			this.pos = {x: null, y: null};
			this.tilex;
			this.tiley;

			this.fireStart;
			this.fireInt;
      this.damage;
			this.cd;

      this.determineTrap();
	}
  getPosition() {
    return {x: this.pos.x, y: this.pos.y, height: this.height, width: this.width};
  }
	determineTrap() {
		//Generate a trap based on type.
		//Assign (Puzzle/Riddle Index) to 200s.
		//Flame = 201, Spike = 202, Blade = 203;
		switch(this.index) {
			case 201:
				this.flame();
				break;
			case 202:
				this.spike();
				break;
			case 203:
				this.blade();
				break;
		}
	}
  flame() {
		this.pos = {x: 150, y: 32};
		this.tilex = 2;
		this.tiley = 13;

    this.height = 1;
    this.width = 4;
    this.damage = 10;
		this.type = 'flame';

		this.fireStart = [this.pos.x, this.pos.x+3, this.pos.x+5.5];
		this.fireInt = [-0.75,-0.75,-0.75];
  }
  spike() {
		this.pos = {x: 150, y: 150};
		this.tilex = 8;
		this.tiley = 6;

    this.height = 1;
    this.width = 1;
    this.damage = 2;
		this.type = 'spike';
		this.fireStart = 0;
  }
  blade() {
		this.pos = {x: 130, y: 140};
		this.tilex = 11;
		this.tiley = 3;
		this.angle = 0;
    this.height = 3;
    this.width = 3;
    this.damage = 5;
		this.type = 'blade';
  }
  update(ctx) {
    //Deal damage, and any other interactions.

		if(this.cd !== 0) this.cd--;
		else {
			this.cd = 5;
			return this.damage;
		}
		//this.render(ctx);
  }
	fireMove() {
		var value = this.pos.x+6;
		var value2 = this.pos.x-6;
		for(var i = 0; i<3; i++) {
			if(this.fireStart[i] > value || this.fireStart[i] < value2) {
				this.fireInt[i] *= -1;
			}
			this.fireStart[i] += this.fireInt[i];
		}
	}
	render(ctx) {
		switch(this.index) {
			case 201:
			this.fireMove();
			for(var i = 0; i<3; i++) {
				ctx.drawImage(
					Constants.tileset,
					this.tilex * Constants.tileSize,
					this.tiley * Constants.tileSize,
					Constants.tileSize,
					Constants.tileSize,
					this.fireStart[i],
					this.pos.y+Constants.tileSize*i,
					Constants.tileSize,
					Constants.tileSize
				);
			}
				break;
			case 202:
				for(var i = 0; i<2; i++) {
					for(var j = 0; j<2; j++) {
						ctx.drawImage(
							Constants.tileset,
							this.tilex * Constants.tileSize,
							this.tiley * Constants.tileSize,
							Constants.tileSize,
							this.fireStart,
							this.pos.x+(Constants.tileSize*i),
							this.pos.y+(Constants.tileSize*j)+(16-this.fireStart),
							Constants.tileSize,
							this.fireStart
						);
					}
				}
			if(this.fireStart < 12) {
				this.fireStart+= 0.8;
			}
				break;
			case 203:
			ctx.save();
			ctx.translate(this.pos.x,this.pos.y);
			ctx.rotate(this.angle);
			this.angle+= 1;

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
			// ctx.drawImage(
			// 	Constants.tileset,
			// 	this.tilex * Constants.tileSize,
			// 	this.tiley * Constants.tileSize-10,
			// 	Constants.tileSize,
			// 	Constants.tileSize,
			// 	(Constants.tileSize/-2),
			// 	(Constants.tileSize/-2)+Constants.tileSize,
			// 	Constants.tileSize,
			// 	Constants.tileSize
			// );

			ctx.restore();
				break;
		}
    //Render trap based on type.

	}
}
