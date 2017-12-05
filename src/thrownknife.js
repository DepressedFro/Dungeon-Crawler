import Monster from './monster.js';
import Constants from './constants.js';
import * as _ from 'lodash';
import Vector from './lib/vector2d.js';

export default class ThrownKnife extends GameObject {
	constructor(game, x, y, dir) {
		super(game,x,y);
		this.setTilePosition(8,6);
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
		this.pos();

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
			Constants.tileSize/2,
			Constants.tileSize
		);
	}


}