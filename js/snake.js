const Coord = require('./coord.js');

class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;
    this.segments = [new Coord(10, 10)];
    this.isTurning = false;
    this.grow = 0;
  }

  move() {
    this.segments.unshift(this.head().plus(Snake.MOVES[this.direction]));
    this.isTurning = false;
    if (this.eatApple()){
      this.board.apple.addApple();
    }

    if (this.grow > 0) {
      this.grow -= 1;
      } else {
      this.segments.pop();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  }

  isValid() {
    const head = this.head();
    if (!this.board.validPos(this.head())) {
      return false;
    }

    for (let i = 1; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  }

  eatApple() {
    if (this.head().equals(this.board.apple.position)) {
      this.grow += 3;
      return true;
    } else {
      return false;
    }
  }

  turn(newDir) {
    if ((Snake.MOVES[this.direction].isOpposite(newDir)) || this.isTurning) {
      return;
    } else {
      this.isTurning = true;
      this.direction = newDir;
    }
  }

  hasCoord([x, y]) {
    this.segments.forEach( (segment) => {
      if ((segment[0] === x ) && (segment[1] === y)) {
        return true;
      } else {
        return false;
      }
    });
  }

  nextCoord() {
    return this.segments[0].plus(Snake.MOVES[this.direction]);
  }

  head() {
    return this.segments[0];
  }
}

Snake.MOVES = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

module.exports = Snake;
