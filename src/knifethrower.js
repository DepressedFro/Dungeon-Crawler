import Monster from './monster.js';
import Constants from './constants.js';
import * as _ from 'lodash';
import Vector from './lib/vector2d.js';
import ThrownKnife from './thrownknife.js';

export default class KnifeThrower extends Monster {
	constructor(game, x, y) {
		super(game,x,y);
		this.setTilePosition(5,10);
		this.dir = 0;
		this.fireDist = 75;
		this.fireTimer = 0;
		this.fireTimerSet = 2;
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

		super.update(delta);
		var xx = this.game.player.pos.x;
		var yy = this.game.player.pos.y;
		var dist = Math.sqrt((this.pos.y-yy)*(this.pos.y-yy) + (this.pos.x-xx)*(this.pos.x-xx));
		var vec = new Vector(xx-this.pos.x,(yy-this.pos.y)).normalize().multiply(delta/1000*60);
		var dir = vec.toAngles();

		if(dist > this.fireDist){
			this.pos.add(vec);	
		}else{
			if(this.fireTimer > 0){
				this.fireTimer -= delta/1000;
			}else{
				this.fireTimer = this.fireTimerSet;
				new ThrownKnife(this.game,this.pos.x,this.pos.y,dir);
			}
		}

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
		//this.debugDrawBBox(ctx);
	}
}