const DOMNodeCollection = require("./dom_node_collection.js");

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
