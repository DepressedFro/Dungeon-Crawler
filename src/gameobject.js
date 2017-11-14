// base class of all renderable objects, handles collisions
export default class GameObject {
    constructor(game,x,y) {
        this.game = game;
    }

    get BBox() {
        return null;
    }

    debugDrawBBox(ctx){
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.BBox.x,this.BBox.y,this.BBox.width,this.BBox.height);
    }

    contains(pos) {
        if (this.BBox === null)
            return false;

        let {x, y} = pos;
        return x >= this.BBox.x && y >= this.BBox.y &&
               x <= this.BBox.x + this.BBox.width &&
               y <= this.BBox.y + this.BBox.height;
    }

    collides(obj) {
        if (this.BBox === null || obj.BBox === null)
            return null;

        if (obj.contains({x: this.BBox.x + this.BBox.width / 2, y: this.BBox.y}) ||
            obj.contains({x: this.BBox.x + this.BBox.width / 2, y: this.BBox.y + this.BBox.height}))
            return "y";
        if ((obj.contains({x: this.BBox.x, y: this.BBox.y}) &&
            obj.contains({x: this.BBox.x, y: this.BBox.y + this.BBox.height})) ||
            (obj.contains({x: this.BBox.x + this.BBox.width, y: this.BBox.y}) &&
            obj.contains({x: this.BBox.x + this.BBox.width, y: this.BBox.y + this.BBox.height})))
            return "x";
        if (obj.contains({x: this.BBox.x, y: this.BBox.y}) ||
            obj.contains({x: this.BBox.x + this.BBox.width, y: this.BBox.y}) ||
            obj.contains({x: this.BBox.x, y: this.BBox.y + this.BBox.height}) ||
            obj.contains({x: this.BBox.x + this.BBox.width, y: this.BBox.y + this.BBox.height}))
            return "y";
        return null;
    }

    update() {}
    render(ctx) {}
}