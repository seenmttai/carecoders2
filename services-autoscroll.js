// New continuous autoscroll for the Our Services carousel
document.addEventListener('DOMContentLoaded', () => {
  const servicesCarousel = document.querySelector('.services-carousel');
  if (!servicesCarousel) return;

  // Duplicate the carousel content for a seamless loop
  servicesCarousel.innerHTML += servicesCarousel.innerHTML;

  const speed = 0.5; // pixels per frame; adjust for desired speed
  function autoScroll() {
    servicesCarousel.scrollLeft += speed;
    // When half of the scrollWidth is reached (the original content), reset scrollLeft
    if (servicesCarousel.scrollLeft >= servicesCarousel.scrollWidth / 2) {
      servicesCarousel.scrollLeft = 0;
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();
});