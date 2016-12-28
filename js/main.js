const Game = require('./snake.js');
const View = require('./snake-view.js');

$( () => {
  const rootEl = $('.snake');
  const game = new Game();
  new View(game, rootEl);
});
