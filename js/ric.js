document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".ric-slide"));
  const prevBtn = document.querySelector(".ric-carousel-prev");
  const nextBtn = document.querySelector(".ric-carousel-next");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function renderSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    renderSlides();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    renderSlides();
  });

  renderSlides();
});

















const ricCarouselImages = [
  "../assets/img/yesstyle_ric.png",
  "../assets/img/ricmaa_ric.png",
  "../assets/img/stylekoren_ric.png",
  "../assets/img/hemsh_ric.png",
  "../assets/img/mixoon_ric.png",
  "../assets/img/miniso_ric.png"
];

let ricCarouselIndex = 0;
let ricCarouselAnimating = false;

const ricCarouselFront = document.getElementById("ricCarouselFront");
const ricCarouselBack = document.getElementById("ricCarouselBack");
const ricCarouselPrev = document.querySelector(".ric-carousel-btn-left");
const ricCarouselNext = document.querySelector(".ric-carousel-btn-right");

function setCarouselImages() {
  const prevIndex = (ricCarouselIndex - 1 + ricCarouselImages.length) % ricCarouselImages.length;
  ricCarouselFront.src = ricCarouselImages[ricCarouselIndex];
  ricCarouselBack.src = ricCarouselImages[prevIndex];
}

function resetCarouselClasses() {
  ricCarouselFront.className = "ric-carousel-front";
  ricCarouselBack.className = "ric-carousel-back";
}

function animateRicCarousel(direction) {
  if (ricCarouselAnimating || !ricCarouselFront || !ricCarouselBack) return;
  ricCarouselAnimating = true;

  const frontOut = direction === "next" ? "slide-out-left" : "slide-out-right";
  const frontIn = direction === "next" ? "slide-in-right" : "slide-in-left";
  const backOut = direction === "next" ? "slide-out-left" : "slide-out-right";
  const backIn = direction === "next" ? "slide-in-right" : "slide-in-left";

  ricCarouselFront.classList.add(frontOut);
  ricCarouselBack.classList.add(backOut);

  setTimeout(() => {
    if (direction === "next") {
      ricCarouselIndex = (ricCarouselIndex + 1) % ricCarouselImages.length;
    } else {
      ricCarouselIndex = (ricCarouselIndex - 1 + ricCarouselImages.length) % ricCarouselImages.length;
    }

    setCarouselImages();
    resetCarouselClasses();

    ricCarouselFront.classList.add(frontIn);
    ricCarouselBack.classList.add(backIn);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ricCarouselFront.classList.add("slide-active");
        ricCarouselBack.classList.add("slide-active");
      });
    });

    setTimeout(() => {
      resetCarouselClasses();
      ricCarouselAnimating = false;
    }, 650);
  }, 320);
}

if (ricCarouselFront && ricCarouselBack && ricCarouselPrev && ricCarouselNext) {
  setCarouselImages();

  ricCarouselPrev.addEventListener("click", () => animateRicCarousel("prev"));
  ricCarouselNext.addEventListener("click", () => animateRicCarousel("next"));
}