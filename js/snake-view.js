const Board = require('./board.js');

class View {
  constructor($el, $view) {
    this.$l = $el;
    this.$view = $view;
    this.board = new Board();
    this.drawBoard();
    this.populateBoard();

    window.setInterval(() => {
      this.step();
      this.populateBoard();
    }, 100);

    $(window).on('keydown', this.handleKeyEvent.bind(this));
  }

  handleKeyEvent() {
    if (View.MOVES[event.keyCode]) {
      this.board.snake.turn(View.MOVES[event.keyCode]);
    }
  }

  drawBoard() {
    this.board.grid.forEach((el) => {
      let $gridRow = $('<ul class="group"></ul>');
      el.forEach( (_,j) => {
        $gridRow.append($('<li></li>'));
      });
      this.$view.append($gridRow);
    });
  }

  populateBoard() {
    
  }



  step() {
    this.board.snake.move();
  }
}

View.MOVES = {
  37: "W",
  38: "N",
  39: "E",
  40: "S"
};

module.exports = View;
