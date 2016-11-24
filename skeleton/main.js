const Router = require("./router.js");
const Inbox = require("./inbox.js");



document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sidebar-nav li").forEach((el) => {
    let text = el.innerText.toLowerCase();
    el.addEventListener("click", () => {

    window.location.hash = text;
    });
  });

  const routes = {
    inbox: new Inbox()
  };

  const content = document.querySelector(".content");
  const router = new Router(content, routes);
  router.start();


});
