class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    this.render();
    window.addEventListener("hashchange", this.render.bind(this), false);
  }

  activeRoute() {
    return this.routes[window.location.hash.slice(1)];
  }

  render() {
    this.node.innerHTML = "";
    const component = this.activeRoute();
    let newNode = document.createElement("p");

    if(component === undefined)
      newNode.innerHTML = "";
    else {
      newNode = component.render();
    }
    this.node.appendChild(newNode);
  }
}


module.exports = Router;
