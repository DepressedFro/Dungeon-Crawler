import Map from './map.js';

export default class Game {
	constructor(screenWidth, screenHeight, context) {
		this.width = screenWidth;
		this.height = screenHeight;
		this.ctx = context;
	}
}