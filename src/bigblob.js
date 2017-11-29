import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import Monster from './monster.js';
import Blob from './blob.js';

export default class BigBlob extends Blob {
	constructor(game, x, y) {
		super(game, x, y);

		this.friction = 0.97;
		this.burstSpeed = 100;
		this.waitTime = 20;
	}

	get BBox() {
		return {
			x: this.pos.x - 6,
			y: this.pos.y - 8,
			width: 11,
			height: 16,
		}
	}

	
	update(delta) {
		super.update(delta);
		
	}

	render(ctx) {
		ctx.drawImage(
			Constants.tileset,
			1 * Constants.tileSize,
			12 * Constants.tileSize,
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