import './index.css';
import Game from './game.js';

var screenwidth = 256;
var screenheight = 256;

var canvas = document.createElement('canvas');
canvas.width = screenwidth;
canvas.height = screenwidth;
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

var temp = ['textbox', 'cA', 'cB', 'cC'];
temp.forEach(function(i){
  var temp2 = document.createElement(i);
  temp2.id = i;
  document.body.appendChild(temp2);
});

var game = new Game(screenwidth, screenheight, context);
window.game = game; // for access from console
