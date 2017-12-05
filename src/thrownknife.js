import Constants from './constants.js';
import * as _ from 'lodash';
import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js';

export default class ThrownKnife extends GameObject {
	constructor(game, x, y, dir) {
		super(game,x,y);
		this.xTile = 8;
		this.yTile = 6;
		this.dir = dir;
		this.pos = new Vector(x,y);
		this.velocity = new Vector(Math.cos(this.dir),Math.sin(this.dir)).multiply(4.5);
		this.friction = 1;
		this.helpz = 0;
		this.z = 0;
		this.efDir = 0;
		this.deathTimer = 5;
	}

	get BBox() {
		return {
			x: this.pos.x - 6,
			y: this.pos.y - 2,
			width: 10,
			height: 10,
		}
	}

	update(delta) {
		this.pos.add(this.velocity);
		this.velocity.multiply(this.friction);
		if(this.helpz < Math.PI){
			this.helpz += delta/200*Math.PI/4*3;
			var tmp = Math.sqrt(Math.sin(this.helpz))*6;
			
			this.efDir = Math.sin(delta/200*Math.PI)*Math.PI/4;
			if(this.velocity.x < 0){
				this.efDir *= -1;
			}

			if(isNaN(tmp)){
				this.z = 0;
			}else{
				this.z = -tmp;
			}
		}else{
			this.velocity.multiply(0,0);
			this.deathTimer -= delta/1000;
			if(this.deathTimer <= 0){
				this.game.remove(this);	
			}
		}
	}

	render(ctx) {
		ctx.save();
		ctx.globalAlpha = this.deathTimer/5;
		ctx.translate(this.pos.x,this.pos.y+this.z);
		ctx.rotate(this.dir+Math.PI/2+this.efDir);
		ctx.drawImage(
			Constants.tileset,
			this.xTile * Constants.tileSize + Constants.tileSize/2,
			this.yTile * Constants.tileSize,
			Constants.tileSize/2,
			Constants.tileSize,
			Math.floor( - 8),
			Math.floor( - 8),
			Constants.tileSize/2,
			Constants.tileSize
		);
		ctx.globalAlpha = 1;
		ctx.restore();
		//this.debugDrawBBox(ctx);
	}

}