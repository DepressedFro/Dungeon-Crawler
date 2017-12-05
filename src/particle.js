import GameObject from './gameobject.js';

export default class Particle extends GameObject {
    zindex = 5;

    constructor(game, pos, speed, acc = {x: 0, y: 0}, color = "#fff", width = 1, lifetime = 1000, trailLen = 5) {
        super(game);
        this.pos = Object.assign({}, pos);
        this.speed = Object.assign({}, speed);
        this.acc = acc;
        this.color = color;
        this.width = width;
        this.lifetime = lifetime;
        this.trailLen = trailLen;
        this.trail = [{...pos}];
        this.startTime = +new Date();
    }

    update(delta) {
        let l = (+new Date() - this.startTime) / this.lifetime;
        if (l > 1)
            return this.destroy();
        
        // this.speed.x *= 0.9;
        // this.speed.y *= 0.9;
        this.speed.x += this.acc.x;
        this.speed.y += this.acc.y;
        this.pos.x += this.speed.x * (1 - l) * delta / 100;
        this.pos.y += this.speed.y * (1 - l) * delta / 100;

        this.trail.unshift(Object.assign({}, this.pos));
        this.trail = this.trail.splice(0, this.trailLen);
    }

    render(ctx) {
        let l = (+new Date() - this.startTime) / this.lifetime;        

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        for (let i = 1; i < this.trail.length; i++) {
            // ctx.globalAlpha = (this.trailLen - i) / this.trailLen * (1 - l);
            
            ctx.beginPath();
            ctx.moveTo(Math.round(this.trail[i-1].x), Math.round(this.trail[i-1].y));
            ctx.lineTo(Math.round(this.trail[i].x), Math.round(this.trail[i].y));
            ctx.stroke();    
        }
    }
}