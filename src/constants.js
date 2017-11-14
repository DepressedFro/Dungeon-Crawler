import tilesetPath from './tileset.png';

let tileset = new Image();
tileset.src = tilesetPath;

let Constants = {
    tileSize: 16,
    tileset: tileset,   
};

export default Constants;