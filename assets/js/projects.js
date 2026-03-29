document.addEventListener("DOMContentLoaded", () => {
  const circle      = document.getElementById("projectsCircle");
  const archiveCircle = document.getElementById("archiveCircle");
  const quarters    = document.querySelectorAll(".project-quarter");
  const stage       = document.querySelector(".projects-stage");

  if (!circle || !quarters.length || !archiveCircle || !stage) return;

  // --- Previews projets ---
  const previewClasses = ["show-bai", "show-lum", "show-ric", "show-montre"];
  function clearPreviews() {
    previewClasses.forEach((cls) => circle.classList.remove(cls));
  }
  quarters.forEach((quarter) => {
    quarter.addEventListener("mouseenter", () => {
      clearPreviews();
      circle.classList.add(`show-${quarter.dataset.preview}`);
    });
    quarter.addEventListener("click", () => {
      if (!swapped && quarter.dataset.link)
        window.navigateTo(quarter.dataset.link);
    });
  });
  circle.addEventListener("mouseleave", clearPreviews);

  // --- Swap ---
  let swapped = false;

  // Positions de base
  const BIG  = { left: "56%", top: "51%", w: "27vw", h: "27vw", z: 2 };
  const SMALL = { left: "37%", top: "59%", w: "17vw", h: "17vw", z: 1 };

  function applyStyles(el, s) {
    el.style.left   = s.left;
    el.style.top    = s.top;
    el.style.width  = s.w;
    el.style.height = s.h;
    el.style.zIndex = s.z;
  }

  const archiveNavLink = document.querySelector('a[href="archive.html"]');
  const projetsNavLink = document.querySelector('a[href="projets.html"]');

  const archiveHint  = document.getElementById("archiveHint");
  const projectsHint = document.getElementById("projectsHint");

  function updateHints(swappedState) {
    if (!archiveHint || !projectsHint) return;
    if (swappedState) {
      // archive → BIG, projets → SMALL
      archiveHint.style.left  = BIG.left;
      archiveHint.style.top   = `calc(${BIG.top} + 14.5vw)`;
      projectsHint.style.left = SMALL.left;
      projectsHint.style.top  = `calc(${SMALL.top} + 9.5vw)`;
    } else {
      // archive → SMALL, projets → BIG
      archiveHint.style.left  = SMALL.left;
      archiveHint.style.top   = `calc(${SMALL.top} + 9.5vw)`;
      projectsHint.style.left = BIG.left;
      projectsHint.style.top  = `calc(${BIG.top} + 14.5vw)`;
    }
  }

  function doSwap() {
    swapped = !swapped;
    if (swapped) {
      applyStyles(archiveCircle, BIG);
      applyStyles(circle, SMALL);
      stage.classList.add("swapped");
      if (projetsNavLink) projetsNavLink.classList.remove("active");
      if (archiveNavLink) archiveNavLink.classList.add("active");
    } else {
      applyStyles(archiveCircle, SMALL);
      applyStyles(circle, BIG);
      stage.classList.remove("swapped");
      if (archiveNavLink) archiveNavLink.classList.remove("active");
      if (projetsNavLink) projetsNavLink.classList.add("active");
    }
    updateHints(swapped);
  }

  // Détecte si un point est dans un cercle
  function isInCircle(el, x, y) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    const rad = r.width / 2;
    return Math.hypot(x - cx, y - cy) <= rad;
  }

  // Un seul listener sur le stage pour gérer les deux cercles
  stage.addEventListener("click", (e) => {
    const x = e.clientX, y = e.clientY;

    if (!swapped && isInCircle(archiveCircle, x, y)) {
      doSwap();
      return;
    }

    if (swapped) {
      if (isInCircle(archiveCircle, x, y)) {
        // Si l'archive preview est visible → naviguer
        window.navigateTo("archive.html");
      } else if (isInCircle(circle, x, y)) {
        // Clic sur le petit cercle projet → swap retour
        doSwap();
      }
    }
  });
});
