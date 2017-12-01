import Constants from './constants.js';
import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js'

export default class Player extends GameObject {
	constructor(game, health, x, y) {
		super(game);
		this.health = health;
		this.pos = {x: x, y: y};
		this.velocity = {x: 0, y: 0};
		this.speed = 100;
		this.gold = 0;
		this.class = 0;
		this.className = "Warrior";
	}

	mouseDown(event){
		switch(event.which){
			//Left click action
			case 1:
				switch(this.class){
					//Left click is Sword attack for Warriors
					case 0:
						break;
				}
				break;
			//Right click action
			case 3:
				switch(this.class){
					//Right click is Block for Warriors
					case 0:
						break;
				}
				break;
		}
	}

	onkeydown(event){
		//Add Keys to Interact and Pause
		switch(event.key) {
			//Move Up with W or Up Keys
			case 'ArrowUp':
			case 'w':
				this.velocity.y = this.speed;
			 	break;
			//Move Left with A or Left Keys
			case 'ArrowLeft':
			case 'a':
				this.velocity.x = -this.speed;
				break;
			//Move Right with D or Right Keys
			case 'ArrowRight':
			case 'd':
				this.velocity.x = this.speed;
				break;
			//Move Down with S or Down Keys
			case 'ArrowDown':
			case 's':
				this.velocity.y = -this.speed;
				break;

		}
	}

	onkeyup(event){
		//Add Keys to Interact and Pause
		switch(event.key) {
			//Move Up with W or Up Keys
			case 'ArrowUp':
			case 'w':
				this.velocity.y = 0;
			 	break;
			//Move Left with A or Left Keys
			case 'ArrowLeft':
			case 'a':
				this.velocity.x = 0;
				break;
			//Move Right with D or Right Keys
			case 'ArrowRight':
			case 'd':
				this.velocity.x = 0;
				break;
			//Move Down with S or Down Keys
			case 'ArrowDown':
			case 's':
				this.velocity.y = 0;
				break;
		}
	}

	attack(){

	}

	update(delta){
		
	}

	render(ctx) {
		ctx.drawImage(
			Constants.tileset,
			14 * Constants.tileSize,
			15 * Constants.tileSize - 4,
			Constants.tileSize,
			Constants.tileSize + 4,
			Math.floor(this.pos.x - 8),
			Math.floor(this.pos.y - 12),
			Constants.tileSize,
			Constants.tileSize + 4
		);
	}
}
