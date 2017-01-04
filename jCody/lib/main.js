const DOMNodeCollection = require("./dom_node_collection.js");

const functionQueue = [];
let docReady = false;
document.addEventListener("DOMContentLoaded", execute);

function execute() {
  docReady = true;
  functionQueue.forEach((func) => {
    func();
  });
}

const $c = function (selector) {
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

window.$c = $c;

$c.extend = function(objectA, ...objects) {
  objects.forEach((object) => {
    for (let key in object) {
      objectA[key] = object[key];
    }
  });
  return objectA;
};

$c.ajax = function(options = {}) {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    data: {},
    success: function() {},
    error: function() {}
  };

  $c.extend(defaults, options);
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

module.exports = $c;
