document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const reviews = document.querySelectorAll('.review-card');
  const reviewsTrack = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const dropdowns = document.querySelectorAll('.dropdown');
  const planRows = document.querySelectorAll('.plan-row');
  const contactForm = document.getElementById('contactForm');
  
  // Set up Reviews Carousel
  let currentIndex = 0;
  const totalReviews = reviews.length;
  const visibleReviews = 2;
  let isAnimating = false;
  
  // Set up the initial carousel position
  function initCarousel() {
    reviewsTrack.style.width = `${totalReviews * (100 / visibleReviews)}%`;
    reviews.forEach(review => {
      review.style.width = `${100 / totalReviews}%`;
    });
    
    updateCarousel();
    createIndicators();
  }
  
  // Update carousel position
  function updateCarousel() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Calculate the percentage to move
    const movePercentage = -(currentIndex * (100 / totalReviews));
    
    // Apply the transform
    reviewsTrack.style.transform = `translateX(${movePercentage}%)`;
    
    // Update indicators
    updateIndicators();
    
    // Reset animation flag after transition
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }
  
  // Create carousel indicators
  function createIndicators() {
    const indicatorsCount = Math.ceil(totalReviews / visibleReviews);
    
    for (let i = 0; i < indicatorsCount; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      
      if (i === 0) {
        indicator.classList.add('active');
      }
      
      indicator.addEventListener('click', () => {
        if (isAnimating) return;
        currentIndex = i * visibleReviews;
        updateCarousel();
      });
      
      indicatorsContainer.appendChild(indicator);
    }
  }
  
  // Update carousel indicators
  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    const activeIndex = Math.floor(currentIndex / visibleReviews);
    
    indicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Event Listeners for carousel navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isAnimating) return;
      currentIndex = Math.max(currentIndex - visibleReviews, 0);
      updateCarousel();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isAnimating) return;
      currentIndex = Math.min(currentIndex + visibleReviews, totalReviews - visibleReviews);
      updateCarousel();
    });
  }
  
  // About section dropdowns
  dropdowns.forEach(dropdown => {
    const header = dropdown.querySelector('.dropdown-header');
    
    header.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
  });
  
  // Service plan dropdowns
  planRows.forEach(row => {
    row.addEventListener('click', () => {
      // Toggle the clicked row
      row.classList.toggle('active');
      
      // Close other rows
      planRows.forEach(otherRow => {
        if (otherRow !== row && otherRow.classList.contains('active')) {
          otherRow.classList.remove('active');
        }
      });
    });
  });
  
  // Form validation
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
        // In a real implementation, you would submit the form data here
        contactForm.reset();
      } else {
        alert('Please fill out all required fields marked with *');
      }
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  
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
  
  // Initialize carousel if it exists
  if (reviewsTrack && reviews.length > 0) {
    initCarousel();
  }
});
