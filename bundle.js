/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const View = __webpack_require__(3);
	const $l = __webpack_require__(6);
	
	$( () => {
	  const rootEl = $('.snake');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(4);
	const $l = __webpack_require__(6);
	class View {
	  constructor($el) {
	    this.$el = $el;
	    this.board = new Board();
	    this.drawBoard();
	
	    this.intervalId = window.setInterval((
	      this.step.bind(this)
	    ), 100);
	
	    $(window).on('keydown', this.handleKeyEvent.bind(this));
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
	    $('.points').text(this.board.snake.points);
	  }
	
	  updateClasses(coords, className) {
	    this.$li.filter(`.${className}`).removeClass();
	
	    coords.forEach( coord => {
	      const flatCoord = (coord.xCoord * 20) + coord.yCoord;
	      this.$li.eq(flatCoord).addClass(className);
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
	
	    this.$el.html(html);
	    this.$li = this.$el.find("li");
	  }
	
	  step() {
	    const rootEl = $('.snake');
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(1);
	const Apple = __webpack_require__(5);
	
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(2);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(7);
	
	const functionQueue = [];
	let docReady = false;
	document.addEventListener("DOMContentLoaded", execute);
	
	function execute() {
	  docReady = true;
	  functionQueue.forEach((func) => {
	    func();
	  });
	}
	
	const $l = function (selector) {
	  if (typeof selector === "function") {
	    if (docReady) {
	      selector();
	    } else {
	      functionQueue.push(selector);
	    }
	  } else if (selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  } else if (typeof selector === "string") {
	    const nodeList = document.querySelectorAll(selector);
	    const nodeListArr = Array.from(nodeList);
	    return new DOMNodeCollection(nodeListArr);
	  } else if (selector === window) {
	    return new DOMNodeCollection([window]);
	  }
	};
	
	window.$l = $l;
	
	$l.extend = function(objectA, ...objects) {
	  objects.forEach((object) => {
	    for (let key in object) {
	      objectA[key] = object[key];
	    }
	  });
	  return objectA;
	};
	
	$l.ajax = function(options = {}) {
	  const defaults = {
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    method: "GET",
	    url: "",
	    data: {},
	    success: function() {},
	    error: function() {}
	  };
	
	  $l.extend(defaults, options);
	  const xhr = new XMLHttpRequest();
	
	  xhr.open(defaults.method, defaults.url);
	  xhr.onload = function() {
	    if (xhr.status === 200) {
	      defaults.success(JSON.parse(xhr.response));
	    } else {
	      defaults.error(JSON.parse(xhr.response));
	    }
	  };
	  xhr.send(defaults.data);
	};
	
	module.exports = $l;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(collection = []) {
	    this.collection = collection;
	  }
	  html(arg) {
	
	    if (arg === undefined) {
	      return this.collection[0].innerHTML;
	    } else {
	      this.each((node) => {
	        node.innerHTML = arg;
	        return;
	      });
	    }
	  }
	
	  each(cb) {
	    this.collection.forEach(cb);
	  }
	
	  empty() {
	    this.html("");
	  }
	
	  append(content) {
	    if (typeof content === 'string') {
	      this.each((node) => {
	        node.innerHTML += content;
	      });
	    } else if (content instanceof DOMNodeCollection) {
	      this.each((parent) => {
	        content.collection.forEach((child) => {
	          parent.appendChild(child);
	        });
	      });
	    }
	  }
	
	  attr(key, val) {
	    if (val === undefined) {
	      return this.collection[0].getAttribute(key);
	    } else {
	      this.collection[0].setAttribute(key, val);
	      return;
	    }
	  }
	
	  addClass(className) {
	    this.each(node => node.classList.add(className));
	  }
	
	  removeClass(className) {
	    this.each(node => node.classList.remove(className));
	  }
	
	  children() {
	    let childrenCollection = [];
	    this.each((childElement) => {
	      childrenCollection = childrenCollection.concat(childElement.children);
	    });
	
	    return new DOMNodeCollection(childrenCollection);
	  }
	
	  parent() {
	    let parentCollection = [];
	    this.each((childElement) => {
	      parentCollection = parentCollection.concat(childElement.parentElement);
	    });
	
	    return new DOMNodeCollection(parentCollection);
	  }
	
	  find(selector) {
	    let selectorNodes = [];
	    this.each((node) => {
	      const allNodes = node.querySelectorAll(selector);
	      selectorNodes = selectorNodes.concat(allNodes);
	    });
	
	    return new DOMNodeCollection(selectorNodes);
	  }
	
	  remove() {
	    this.each((node) => {
	      node.remove();
	    });
	  }
	
	  on(e, callback) {
	    this.each((node) => {
	      node.addEventListener(e, callback);
	      node.eventCallBack = callback;
	    });
	    return;
	  }
	
	  off(e) {
	    this.each((node) => {
	      const callback = node.eventCallBack;
	        node.removeEventListener(e, callback);
	    });
	  }
	
	  text(string) {
	    this.each((node) => {
	      node.textContent = string;
	    });
	    return;
	  }
	
	  filter(selector) {
	    let filteredNodes = [];
	    this.collection[0].forEach((node) => {
	      if (node.classname === selector) {
	        filteredNodes.push(node);
	      }
	    });
	
	    return new DOMNodeCollection(filteredNodes);
	  }
	
	  eq(index) {
	
	  }
	}
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map