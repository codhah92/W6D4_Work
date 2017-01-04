const Board = require('./board.js');
const $c = require('./../jCody/lib/main.js');

class View {
  constructor(el) {
    this.el = el;
    this.board = new Board();
    this.drawBoard();

    this.intervalId = window.setInterval((
      this.step.bind(this)
    ), 100);

    $c(window).on('keydown', this.handleKeyEvent.bind(this));
  }

  handleKeyEvent() {
    if (View.MOVES[event.keyCode]) {
      this.board.snake.turn(View.MOVES[event.keyCode]);
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
    this.renderPoints();
  }

  renderPoints() {
    $c('.points').text(this.board.snake.points);
  }

  updateClasses(coords, className) {
    $c(`.${className}`).removeClass(className);

    coords.forEach( coord => {
      const flatCoord = (coord.xCoord * 20) + coord.yCoord;
      if (this.$li) {
        this.$li.eq(flatCoord).addClass(className);
      }
    });
  }

  drawBoard() {
    let html = "";

    for (let i = 0; i < 20; i++) {
      html += "<ul>";
      for (let j = 0; j < 20; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.el.html(html);
    this.$li = $c("li");
  }

  step() {
    const rootEl = $c('.snake');
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose! Try again.");
      window.clearInterval(this.intervalId);
      new View(rootEl);
    }
  }
}

View.MOVES = {
  37: "W",
  38: "N",
  39: "E",
  40: "S"
};

module.exports = View;
