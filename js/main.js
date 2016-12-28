const Game = require('./snake.js');
const View = require('./snake-view.js');

$( () => {
  const rootEl = $('.snake');
  new View(rootEl);
});
