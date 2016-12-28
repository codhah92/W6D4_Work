class Coord {
  constructor(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  plus(next) {
    return new Coord(next.xCoord + this.xCoord, next.yCoord + this.yCoord);
  }

  equals(next) {
    if ((next.xCoord === this.xCoord) && (next.yCoord === this.yCoord)){
      return true;
    } else {
      return false;
    }
  }

  isOpposite(next) {
    if ((this.xCoord === (-1 * next.xCoord)) &&
        (this.yCoord === (-1 * next.yCoord))){
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Coord;
