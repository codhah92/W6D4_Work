const Coord = require('./coord.js');

class Snake {
  constructor() {
    this.direction = "N";
    this.segments = [new Coord(10, 10)];
    this.isTurning = false;
  }

  move() {
    this.segments.unshift(this.head().plus(Snake.MOVES[this.direction]));
  }

  turn(newDir) {
    if ((Snake.MOVES[this.direction].isOpposite(newDir)) || this.isTurning) {
      return;
    } else {
      this.isTurning = true;
      this.direction = newDir;
    }

    this.isTurning = false;
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

  head() {
    return this.segments[0];
  }
}

Snake.MOVES = {
  "N": new Coord(0, -1),
  "E": new Coord(1, 0),
  "S": new Coord(0, 1),
  "W": new Coord(-1, 0)
};

module.exports = Snake;
