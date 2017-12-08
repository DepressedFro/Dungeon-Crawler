import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import Monster from './monster.js';
import Blob from './blob.js';

export default class BigBlob extends Blob {

	zindex = 5;

	constructor(game, x, y) {
		super(game, x, y);
		this.setTilePosition(1, 12);
		this.friction = 0.97;
		this.burstSpeed = 300;
		this.waitTime = 2000;
		this.name = "big blob";
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

	onDeath() {
		for (var i = 0; i < 3; i++) {
			let b = new Blob(this.game, this.pos.x, this.pos.y);
			b.timer = 0;
		}
		super.onDeath();
	}

}
