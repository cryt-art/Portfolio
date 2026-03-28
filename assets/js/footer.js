document.addEventListener("DOMContentLoaded", () => {
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