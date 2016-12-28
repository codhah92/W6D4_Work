const Snake = require('./snake.js');

class Board {
  constructor() {
    this.grid = Board.createGrid();
    this.snake = new Snake(this);
    this.apples = [];
    this.makeApple();
  }

  makeApple() {
    let xCoord = Math.floor(Math.random() * 20);
    let yCoord = Math.floor(Math.random() * 20);

    while (this.snake.hasCoord([xCoord, yCoord]) ) {
      xCoord = Math.floor(Math.random() * 20);
      yCoord = Math.floor(Math.random() * 20);
    }
    this.apples.push([xCoord, yCoord]);
  }



  static createGrid() {
   const grid = [];

   for (let i = 0; i < 20; i++) {
     grid.push([]);
     for (let j = 0; j < 20; j++) {
       grid[i].push(null);
     }
   }
   return grid;
  }
}

module.exports = Board;
