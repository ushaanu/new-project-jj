jQuery(window).scroll(function(){
    if ($(this).scrollTop() > 50) {
       $('.header-sec').addClass('sticky');
    } else {
       $('.header-sec').removeClass('sticky');
    }
});



function createCarouselIndicators(carouselId, indicatorCount, indicatorClass = '', customContent = null) {
  const ol = document.createElement('ol');
  ol.className = 'carousel-indicators';

  for (let i = 0; i < indicatorCount; i++) {
    const li = document.createElement('li');
    li.setAttribute('data-bs-target', `#${carouselId}`);
    li.setAttribute('data-bs-slide-to', i.toString());
    if (i === 0) li.classList.add('active');
    if (indicatorClass) li.classList.add(indicatorClass);
    
    if (customContent && customContent[i]) {
      li.innerHTML = customContent[i];
    }

    ol.appendChild(li);
  }

  return ol;
}

function initializeCarousel(carouselId, indicatorCount, indicatorClass = '', customContent = null) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const indicators = createCarouselIndicators(carouselId, indicatorCount, indicatorClass, customContent);
  carousel.querySelector('.carousel-indicators')?.remove();
  carousel.prepend(indicators);

  // Initialize the Bootstrap 5 Carousel
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 5000, // Adjust as needed
    wrap: true
  });

  // Add click event listeners to indicators
  indicators.querySelectorAll('li').forEach((indicator, index) => {
    indicator.addEventListener('click', (event) => {
      event.preventDefault();
      carouselInstance.to(index);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize each carousel
  initializeCarousel('rfq-content-slider', 3, 'rfq-indicators');
  initializeCarousel('orders-content-slider', 3, 'ocs-indicators');
  initializeCarousel('featured-brands-slider', 3, 'fbs-indicators');
  initializeCarousel('featured-brands-btm-slider', 3, 'fbs-btm-indicators');


  // For browse-by-industry-slider with custom content
  const customContent = [
    '<img src="images/building-construction-indicator-img.png" alt="Building & Construction">',
    '<img src="images/Electricals-Electronics-IT-indicator-img.png" alt="Electricals, Electronics & IT">',
    '<img src="images/ISEP-indicator-img.png" alt="ISEP">',
    '<img src="images/MME-indicator-img.png" alt="MME">',
    '<img src="images/ppos-indicator-img.png" alt="PPOS">'
  ];
  initializeCarousel('browse-by-industry-slider', 5, 'bbis-indicators', customContent);
});