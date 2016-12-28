const Coord = require("./coord");

class Apple {
  constructor(board) {
    this.board = board;
    this.addApple();
  }

  addApple() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);

    while (this.board.snake.hasCoord([x, y])) {
      x = Math.floor(Math.random() * 20);
      y = Math.floor(Math.random() * 20);
    }

    this.position = new Coord(x, y);
  }

}

module.exports = Apple;
