import GameObject from './gameobject.js';
import Constants from './constants.js';
import tilesetPath from './tileset.png';

let tileset = new Image();
tileset.src = tilesetPath;

export class Tile extends GameObject {
    passable = true;
    
    constructor(game, x, y) {
        super(game);
        this.pos = {x, y};
    }

    get BBox() {
        return {
            x: this.pos.x,
            y: this.pos.y,
            width: Constants.tileSize,
            height: Constants.tileSize,
        }
    }

    render(ctx) {
        // check that the tileset is loaded
        if (!tileset.complete)
            return;

        ctx.drawImage(
            tileset,
            this.sourcePos.x * Constants.tileSize, // source BBox
            this.sourcePos.y * Constants.tileSize,
            Constants.tileSize,
            Constants.tileSize,
            this.pos.x * Constants.tileSize, // target BBox
            this.pos.y * Constants.tileSize,
            Constants.tileSize,
            Constants.tileSize,
        )
    }
}

export class FloorTile extends Tile {
    sourcePos = {x: 2, y: 3};
}

export class WallTile extends Tile {
    passable = false;
    sourcePos = {x: 1, y: 1};
}