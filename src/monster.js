import GameObject from './gameobject.js';
import Vector from './lib/vector2d.js';

export default class Monster extends GameObject {
	constructor(game, x, y) {
		super(game);
		this.pos = new Vector(x, y);
		this.speed = new Vector(0, 0);
	}

}