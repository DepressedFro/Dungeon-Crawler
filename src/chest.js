import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js';

export default class Chest extends GameObject {
	constructor(game, x, y, dir) {
		super(game,x,y);
		this.pos = new Vector(x,y);
		this.xTile = 15;
		this.yTile = 13;
	}

	get BBox() {
		return {
			x: this.pos.x ,
			y: this.pos.y ,
			width: 16,
			height: 16,
		}
	}

	render(ctx) {
		ctx.drawImage(
			Constants.tileset,
			this.xTile * Constants.tileSize,
			this.yTile * Constants.tileSize,
			Constants.tileSize,
			Constants.tileSize,
			Math.floor(this.pos.x),
			Math.floor(this.pos.y),
			Constants.tileSize,
			Constants.tileSize
		);
		//this.debugDrawBBox(ctx);
	}

}