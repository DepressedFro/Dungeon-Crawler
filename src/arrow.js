import Vector from './lib/vector2d.js';
import GameObject from './gameobject.js'
import Constants from './constants.js';
const arrowSpeed = 15;

export default class Arrow{
    constructor(start, end){
      this.start = start;
      this.end = end;
      this.target = this.end - this.start;
      this.pos = this.start;
      this.angle = Math.atan2(this.target.Y,this.target.X);
      this.velocity = new Vector(Math.cos(this.angle), Math.sin(this.angle));
      this.remove = false;
    }

    //Update arrows
    update(delta){
      this.pos.x += this.velocity.x * arrowSpeed;
      this.pos.y -= this.velocity.y * arrowSpeed;
      if(this.pos.x < 0 || this.pos.x > 1000 ||this.pos.y < 0 || this.pos.y > 1000){
        this.remove = true;
      }
    }

    render(ctx){
      ctx.drawImage(
  			Constants.tileset,
  			7 * Constants.tileSize + 3,
  			8 * Constants.tileSize,
  			(Constants.tileSize/2) - 2,
  			(Constants.tileSize/2) - 2,
  			Math.floor(this.pos.x),
  			Math.floor(this.pos.y + 4),
  			(Constants.tileSize/2) - 2,
  			(Constants.tileSize/2) - 2
  		);

    }
}
