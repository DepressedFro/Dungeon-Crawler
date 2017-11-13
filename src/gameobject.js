// base class of all renderable objects, handles collisions
export class GameObject {
    constructor(game) {
        this.game = game;
    }

    get BBox() {
        return null;
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
            return false;
        return ((this.BBox.x < obj.BBox.x + obj.BBox.width && this.BBox.x > obj.BBox.x) ||
                (this.BBox.x + this.BBox.width > obj.BBox.x && this.BBox.x + this.BBox.width < obj.BBox.x + obj.BBox.x) ||
                (this.BBox.y < obj.BBox.y + obj.BBox.height && this.BBox.y > obj.BBox.y) ||
                (this.BBox.y + this.BBox.height > obj.BBox.y && this.BBox.y + this.BBox.height < obj.BBox.y + obj.BBox.y))
    }

    update() {}
    render(ctx) {}
}