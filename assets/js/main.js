const splash = document.getElementById("splash");
const black  = document.getElementById("black");
const home   = document.getElementById("home");

window.addEventListener("load", () => {

  if (sessionStorage.getItem("splashSeen")) {
    // Déjà vu dans cette session → on saute l'animation
    splash.style.display = "none";
    black.style.display  = "none";
    home.classList.add("show");
    return;
  }

  // Première visite → animation normale
  sessionStorage.setItem("splashSeen", "1");

  setTimeout(() => {
    splash.classList.add("hide");
    black.classList.add("show");
  }, 1600);

  setTimeout(() => {
    black.classList.remove("show");
    home.classList.add("show");
  }, 2600);

});
