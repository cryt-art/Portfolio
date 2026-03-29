// ===== TRANSITION ENTRE PAGES =====
(function () {
  const overlay = document.createElement("div");
  overlay.className = "page-transition active";
  document.body.appendChild(overlay);

  // Fade-in à l'entrée
  requestAnimationFrame(() => requestAnimationFrame(() => {
    overlay.classList.remove("active");
  }));

  // Fonction globale réutilisable (ex: projects.js)
  window.navigateTo = function (href) {
    overlay.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 450);
  };

  // Intercepte tous les clics sur liens internes
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || link.target === "_blank" || /^(https?:|mailto:|#)/.test(href)) return;
    e.preventDefault();
    window.navigateTo(link.href);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // ===== NAVIGATION CLAVIER ←→ =====
  const leftLink  = document.querySelector(".nav-edge-left");
  const rightLink = document.querySelector(".nav-edge-right");

  if (leftLink || rightLink) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft"  && leftLink)  window.navigateTo(leftLink.href);
      if (e.key === "ArrowRight" && rightLink) window.navigateTo(rightLink.href);
    });
  }

  const footerMount = document.getElementById("site-footer");
  if (!footerMount) return;

  const isInProjects = window.location.pathname.includes("/projects/");
  const assetPrefix = isInProjects ? "../" : "";

  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <a class="footer-link" href="https://www.linkedin.com/in/roseline-cheng/" target="_blank" rel="noopener noreferrer">
          <img src="${assetPrefix}assets/img/logo-linkedin.png" alt="LinkedIn">
          <span>Linkedin : Roseline Cheng</span>
        </a>

        <a class="footer-link" href="https://www.instagram.com/crytart" target="_blank" rel="noopener noreferrer">
          <img src="${assetPrefix}assets/img/logo-instagram.png" alt="Instagram">
          <span>Instagram : crytart</span>
        </a>

        <a class="footer-link" href="mailto:roseline.cheng2006@gmail.com">
          <img src="${assetPrefix}assets/img/logo-email.png" alt="Email">
          <span>Mail : roseline.cheng2006@gmail.com</span>
        </a>
      </div>
    </footer>
  `;
});