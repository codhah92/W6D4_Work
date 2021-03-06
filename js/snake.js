const Coord = require('./coord.js');
const $c = require('./../jCody/lib/main.js');

class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;
    this.segments = [new Coord(10, 10)];
    this.isTurning = false;
    this.grow = 0;
    this.points = 0;
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

    if (!this.validMove()) {
      this.segments = [];
      $c('.game-over').removeClass('hidden');
      $c('.new-game').removeClass('hidden');
    }
  }

  validMove() {
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
      this.points += 10;
      this.grow += 3;
      return true;
    } else {
      return false;
    }
  }

  turn(newDir) {
    if ((Snake.MOVES[this.direction].isOpposite(Snake.MOVES[newDir])) || this.isTurning) {
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
      }
    });

    return false;
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
