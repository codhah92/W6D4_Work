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

  selfCollision() {
    for (let i = 0; i < this.segments.length; i++) {
      if (this.segments[i].equals(this.nextCoord())) {
        return true;
      }
    }
    return false;
  }

  wallCollision() {
    const newCoord = this.nextCoord();

    if (
      newCoord.xPos < 0 ||
      newCoord.yPos < 0 ||
      newCoord.xPos > 19 ||
      newCoord.yPos > 19
    ) {
      return true;
    } else {
      return false;
    }
  }

  nextCoord() {
    return this.segments[0].plus(Snake.MOVES[this.direction]);
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
