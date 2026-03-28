const splash = document.getElementById("splash");
const black = document.getElementById("black");
const home = document.getElementById("home");

window.addEventListener("load", () => {

  setTimeout(() => {
    splash.classList.add("hide");
    black.classList.add("show");
  }, 1600);

  setTimeout(() => {
    black.classList.remove("show");
    home.classList.add("show");
  }, 2600);

});