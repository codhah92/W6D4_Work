const Game = require('./snake.js');
const View = require('./snake_view.js');
const $c = require('./../jCody/lib/main.js');

$c( () => {
  const rootEl = $c('.grid');
  new View(rootEl);
});
