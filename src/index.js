import './index.css';
import Game from './game.js';

var screenwidth = 512;
var screenheight = 512;

var canvas = document.createElement('canvas');
canvas.width = screenwidth;
canvas.height = screenwidth;
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var game = new Game(screenwidth, screenheight, context);