document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("projectsCircle");
  const quarters = document.querySelectorAll(".project-quarter");

  if (!circle || !quarters.length) return;

  const previewClasses = [
    "show-bai",
    "show-lum",
    "show-ric",
    "show-montre"
  ];

  function clearPreviews() {
    previewClasses.forEach((className) => {
      circle.classList.remove(className);
    });
  }

  quarters.forEach((quarter) => {
    // hover preview
    quarter.addEventListener("mouseenter", () => {
      clearPreviews();
      circle.classList.add(`show-${quarter.dataset.preview}`);
    });

    // click → redirect
    quarter.addEventListener("click", () => {
      const link = quarter.dataset.link;
      if (link) {
        window.location.href = link;
      }
    });
  });

  circle.addEventListener("mouseleave", clearPreviews);
});