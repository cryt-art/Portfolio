document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScroll = 0;

  // Écoute le scroll sur le body (pages projet) ET window (fallback)
  const scrollEl = document.body;

  function onScroll() {
    const current = scrollEl.scrollTop || window.scrollY;
    if (current > lastScroll && current > 80) {
      // Scroll vers le bas → cache
      header.classList.add("header--hidden");
    } else if (current < lastScroll) {
      // Scroll vers le haut → réaffiche
      header.classList.remove("header--hidden");
    }
    lastScroll = current;
  }

  scrollEl.addEventListener("scroll", onScroll);
  window.addEventListener("scroll", onScroll);

  // Réaffiche quand la souris approche du haut
  document.addEventListener("mousemove", (e) => {
    if (e.clientY < 80) {
      header.classList.remove("header--hidden");
    }
  });
});
