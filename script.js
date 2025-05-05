document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdowns = document.querySelectorAll('.dropdown');
  const planRows = document.querySelectorAll('.plan-row');
  const reviewsSlider = document.querySelector('.reviews-slider');
  const reviewsArray = document.querySelectorAll('.review-card');
  const prevButton = document.querySelector('.carousel-arrow.prev');
  const nextButton = document.querySelector('.carousel-arrow.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  const contactForm = document.getElementById('contactForm');
  
  let currentReviewIndex = 0;
  let isAnimating = false;
  
  // Navigation Highlighting & Smooth Scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calculate scroll position accounting for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // About Section Dropdowns
  dropdowns.forEach(dropdown => {
    const header = dropdown.querySelector('.dropdown-header');
    
    header.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
  });
  
  // Service Plan Rows
  planRows.forEach(row => {
    const header = row.querySelector('.plan-header');
    
    header.addEventListener('click', () => {
      // Toggle active state
      row.classList.toggle('active');
      
      // Close other plans
      planRows.forEach(otherRow => {
        if (otherRow !== row && otherRow.classList.contains('active')) {
          otherRow.classList.remove('active');
        }
      });
    });
  });
  
  // Setup Carousel
  function setupCarousel() {
    if (!reviewsSlider || reviewsArray.length === 0) return;
    
    // Create dots
    const totalDots = Math.ceil(reviewsArray.length / 2);
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        if (isAnimating) return;
        
        currentReviewIndex = i * 2;
        updateCarousel();
      });
      
      dotsContainer.appendChild(dot);
    }
    
    // Position slider to show first two reviews
    updateCarousel();
  }
  
  // Update Carousel
  function updateCarousel() {
    if (isAnimating || !reviewsSlider) return;
    
    isAnimating = true;
    
    // Calculate position
    const position = -(currentReviewIndex * 50) + '%';
    
    // Apply transition
    reviewsSlider.style.transform = `translateX(${position})`;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    const activeDotIndex = Math.floor(currentReviewIndex / 2);
    
    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Reset animation flag
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  // Next button
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (isAnimating) return;
      
      const maxIndex = reviewsArray.length - 2;
      currentReviewIndex = currentReviewIndex >= maxIndex ? 0 : currentReviewIndex + 2;
      
      // Add animation class
      reviewsSlider.classList.add('slide-left');
      
      setTimeout(() => {
        reviewsSlider.classList.remove('slide-left');
        updateCarousel();
      }, 50);
    });
  }
  
  // Previous button
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (isAnimating) return;
      
      const maxIndex = reviewsArray.length - 2;
      currentReviewIndex = currentReviewIndex <= 0 ? maxIndex : currentReviewIndex - 2;
      
      // Add animation class
      reviewsSlider.classList.add('slide-right');
      
      setTimeout(() => {
        reviewsSlider.classList.remove('slide-right');
        updateCarousel();
      }, 50);
    });
  }
  
  // Form Validation
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        alert('Thank you for your message! We will be in touch soon.');
        contactForm.reset();
      } else {
        alert('Please fill out all required fields marked with *');
      }
    });
  }
  
  // Initialize carousel
  setupCarousel();
});
