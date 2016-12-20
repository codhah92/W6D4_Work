/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	const readyFuncs = [];
	let docReady = false;
	document.addEventListener("DOMContentLoaded", executeLoad);


	function executeLoad() {
	  docReady = true;
	  readyFuncs.forEach((fn) => {
	    fn();
	  });
	}

	$l = function(selector) {

	  if(selector instanceof Function) {
	    if(docReady)
	      selector();
	    else
	      readyFuncs.push(selector);
	  } else if(selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  } else if(typeof(selector) === "string") {
	    const args = [];
	    args.push(document.querySelector(selector));
	    return new DOMNodeCollection(args);
	  }


	};
	$l.extend = function(objectA, ...objects) {
	  objects.forEach((object) => {
	    for(let key in object) {
	      objectA[key] = object[key];
	    }
	  });
	  return objectA;
	};

	$l.ajax = function(options = {}) {
	  const defaults = {
	    method: "GET",
	    url: "",
	    success: function() {},
	    error: function() {},
	    data: {},
	    contentType: "json"
	  };

	  $l.extend(defaults, options);

	  const xhr = new XMLHttpRequest();

	  xhr.open(defaults.method, defaults.url);

	  xhr.onload = defaults.success;


	  xhr.send(defaults.data);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(collection = []) {
	    this.collection = collection;
	  }
	  html(arg) {

	    if(arg === undefined) {
	      return this.collection[0].innerHTML;
	    } else {
	      this.collection.forEach((node) => {
	        node.innerHTML = arg;
	        return this;
	      });
	    }
	  }

	  empty() {
	    html("");
	    return this;
	  }

	  append(arg) {
	    let el;
	    if(typeof(arg) === "string") {
	      el = new DOMNodeCollection([arg]);
	    }
	    else if(arg instanceof HTMLElement) {
	      el = new DOMNodeCollection([arg]);
	    } else {
	      el = arg;
	    }

	    this.collection.forEach((node) => {
	      node.innerHTML += el.collection[0];
	    });

	    return this;
	  }

	  attr(arg, val) {
	    if(val === undefined) {
	      return this.collection[0].getAttribute(arg);
	    } else {
	      this.collection[0].setAttribute(arg, val);
	    }
	    return this;
	  }

	  addClass(classname) {
	    let classes = this.attr("class").split(" ");

	    if(!classes.includes(classname)) {
	      classes.push(classname);
	    }

	    this.attr("class", classes.join(" "));
	    return this;
	  }

	  removeClass(classname) {
	    let classes = this.attr("class").split(" ");

	    let index = classes.indexOf(classname);

	    if(index > -1) {
	      classes.splice(index, 1);
	    }

	    this.attr("class", classes.join(" "));
	    return this;
	  }

	  children() {
	    return new DOMNodeCollection(this.collection[0].children);
	  }

	  parent() {
	    return new DOMNodeCollection(this.collection[0].parent);
	  }

	  find(arg) {
	    return new DOMNodeCollection(this.collection[0].querySelectorAll(arg));
	  }

	  remove() {
	    this.collection.forEach((node) => {
	      node.remove();
	    });
	  }

	  on(event, callback) {
	    this.collection.forEach((node) => {
	      node.addEventListener(event, callback.bind(this));
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);