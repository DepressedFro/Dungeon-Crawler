import './index.css';
import Game from './game.js';

var screenwidth = 256;
var screenheight = 256;

var canvas = document.createElement('canvas');
canvas.width = screenwidth;
canvas.height = screenwidth;
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var game = new Game(screenwidth, screenheight, context);