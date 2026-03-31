// ===== TRANSITION ENTRE PAGES (accueil) =====
// Pas de fade-in ici : le splash s'en charge déjà.
// On définit navigateTo pour que la nav clavier et les liens utilisent la transition.
(function () {
  const overlay = document.createElement("div");
  overlay.className = "page-transition";
  document.body.appendChild(overlay);

  window.navigateTo = function (href) {
    overlay.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 250);
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || link.target === "_blank" || /^(https?:|mailto:|#)/.test(href)) return;
    e.preventDefault();
    window.navigateTo(link.href);
  });
})();

// ===== LABELS NAV-EDGE =====
(function () {
  const pageNames = {
    'index.html':   'ACCUEIL',
    'profil.html':  'PROFIL',
    'projets.html': 'PROJETS',
    'archive.html': 'ARCHIVE',
    'lum.html':     'LUM',
    'bai.html':     'BAI',
    'montre.html':  'MONTRE',
    'ric.html':     'RIC',
  };
  document.querySelectorAll('.nav-edge').forEach(link => {
    const filename = link.getAttribute('href').split('/').pop();
    const name = pageNames[filename];
    if (name) link.setAttribute('data-label', name);
  });
})();

// ===== NAVIGATION CLAVIER ←→ =====
document.addEventListener("keydown", (e) => {
  const leftLink  = document.querySelector(".nav-edge-left");
  const rightLink = document.querySelector(".nav-edge-right");
  if (e.key === "ArrowLeft"  && leftLink)  window.navigateTo(leftLink.href);
  if (e.key === "ArrowRight" && rightLink) window.navigateTo(rightLink.href);
});

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
