import GameObject from './gameobject.js';
import Constants from './constants.js';

export class Tile extends GameObject {
    passable = true;
    zindex = -10;

    constructor(game, x, y) {
        super(game);
        this.pos = { x, y };
    }

    get BBox() {
        return {
            x: this.pos.x * Constants.tileSize,
            y: this.pos.y * Constants.tileSize,
            width: Constants.tileSize,
            height: Constants.tileSize,
        }
    }

    render(ctx) {
        // check that the tileset is loaded
        if (!Constants.tileset.complete)
            return;

        ctx.drawImage(
            Constants.tileset,
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
    sourcePos = { x: 2, y: 3 };
}

export class WallTile extends Tile {
    passable = false;
    sourcePos = { x: 1, y: 1 };
}