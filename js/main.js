const Game = require('./snake.js');
const View = require('./snake-view.js');

$( () => {
  const rootEl = $('.grid');
  const game = new Game();
  new View(game, rootEl);
});
