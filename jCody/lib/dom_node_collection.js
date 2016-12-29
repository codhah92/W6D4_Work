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
