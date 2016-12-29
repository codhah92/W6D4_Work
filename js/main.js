const Game = require('./snake.js');
const View = require('./snake_view.js');
const $l = require('../jCody/lib/main.js');

$( () => {
  const rootEl = $('.snake');
  new View(rootEl);
});
