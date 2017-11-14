import GameObject from './gameobject.js'

export default class Player extends GameObject {
	constructor(game,health,x,y) {
		super(game);
		this.health = health;
		this.x = x;
		this.y = y;
		this.gold = 0;
	}
	
	render(ctx) {

	}
	
	update() {
		
	}
}