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
