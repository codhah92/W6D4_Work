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

	const DOMNodeCollection = __webpack_require__(1);
	
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
/* 1 */
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
//# sourceMappingURL=jCody.js.map