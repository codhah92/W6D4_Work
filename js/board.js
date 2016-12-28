const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Board {
  constructor() {
    this.grid = Board.createGrid();
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  validPos(coord) {
    return (coord.xCoord >= 0) && (coord.xCoord < 20) &&
     (coord.yCoord >= 0) && (coord.yCoord < 20);
  }

  render() {
    const grid = Board.createGrid();

    this.snake.segments.forEach( (segment) => {
      grid[segment.xCoord][segment.yCoord] = "S";
    });

    grid[this.apple.position.xCoord][this.apple.position.yCoord] = "A";

    grid.map( row => row.join("") ).join("\n");
  }

  static createGrid() {
   const grid = [];

   for (let i = 0; i < 20; i++) {
     grid.push([]);
     for (let j = 0; j < 20; j++) {
       grid[i].push("E");
     }
   }
   return grid;
  }
}

module.exports = Board;
