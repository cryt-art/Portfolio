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

  // ===== SCROLL TO TOP =====
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-top-btn";
  scrollBtn.setAttribute("aria-label", "Retour en haut");
  scrollBtn.textContent = "↑";
  document.body.appendChild(scrollBtn);

  function updateScrollBtn() {
    const y = scrollEl.scrollTop || window.scrollY;
    scrollBtn.classList.toggle("visible", y > 300);
  }
  window.addEventListener("scroll", updateScrollBtn);
  scrollEl.addEventListener("scroll", updateScrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    scrollEl.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== RETOUR AUX PROJETS =====
  const isProjectPage = ["lum-page", "bai-page", "montre-page", "ric-page"]
    .some(cls => document.body.classList.contains(cls));
  const isArchivePage  = document.body.classList.contains("archive-page");
  const isContactPage  = document.body.classList.contains("contact-page");

  let backLink = null;
  if (isProjectPage || isArchivePage || isContactPage) {
    backLink = document.createElement("a");
    backLink.className = "back-to-projects";
    backLink.href = isProjectPage ? "../projets.html" : "projets.html";
    backLink.textContent = "← PROJETS";
    document.body.appendChild(backLink);
  }

  // Remonte le bouton ↑ et le lien ← PROJETS quand le footer est visible
  const footer = document.querySelector(".site-footer, .contact-footer");
  if (footer) {
    const obs = new IntersectionObserver((entries) => {
      const h = entries[0].isIntersecting ? entries[0].boundingClientRect.height : 0;
      scrollBtn.style.bottom = (36 + h) + "px";
      if (backLink) backLink.style.bottom = (36 + h) + "px";
    });
    obs.observe(footer);
  }

  // ===== INDICATEUR DE PROJET =====
  const projectOrder = ["lum", "bai", "montre", "ric"];
  const projectNames = { lum: "LUM", bai: "BAI", montre: "MONTRE", ric: "RIC" };
  const current = projectOrder.find(p => document.body.classList.contains(`${p}-page`));

  if (current) {
    const indicator = document.createElement("div");
    indicator.className = "project-indicator";
    indicator.innerHTML = projectOrder
      .map((p, i) => {
        const dot = i < projectOrder.length - 1 ? '<span class="dot">·</span>' : "";
        if (p === current) {
          return `<span class="active">${projectNames[p]}</span>${dot}`;
        }
        return `<a href="${p}.html">${projectNames[p]}</a>${dot}`;
      })
      .join("");
    document.body.appendChild(indicator);
  }
});
