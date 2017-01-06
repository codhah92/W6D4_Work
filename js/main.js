const Game = require('./snake.js');
const View = require('./snake_view.js');
const $c = require('./../jCody/lib/main.js');

$c( () => {
  const rootEl = $c('.grid');
  $c('.new-game').on('click', () => {
    $c('.new-game').addClass('hidden');
    $c('.game-over').addClass('hidden');
    new View(rootEl);
  });
  new View(rootEl);
});
