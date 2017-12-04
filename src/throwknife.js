import Monster from './monster.js';
import Constants from './constants.js';
import * as _ from 'lodash';
import Vector from './lib/vector2d.js';

export default class KnifeThrower extends GameObject {
	constructor(game, x, y) {
		super(game,x,y);
		this.setTilePosition(5,10);
		this.dir = 0;
		this.fireDist = 50;
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


	}

	render(ctx) {
		ctx.drawImage(
			Constants.tileset,
			this.xTile * Constants.tileSize,
			this.yTile * Constants.tileSize,
			Constants.tileSize,
			Constants.tileSize,
			Math.floor(this.pos.x - 8),
			Math.floor(this.pos.y - 8),
			Constants.tileSize,
			Constants.tileSize
		);
	}


}