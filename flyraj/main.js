/* ============================================================
   FLYRAJ TOUR & TRAVELS LTD. — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Mobile hamburger ─── */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = nav.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity  = nav.classList.contains('open') ? '0' : '';
      spans[2].style.transform = nav.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    /* Close nav on link click */
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ─── Active nav link ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ─── Scroll reveal ─── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
  }

  /* ─── Hero Slideshow (index.html) ─── */
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let current = 0;
    function nextSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }
    slides[0].classList.add('active');
    setInterval(nextSlide, 5000);
  } else if (slides.length === 1) {
    slides[0].classList.add('active');
  }

  /* ─── Hero counter animation ─── */
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          let count = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            count = Math.min(count + step, target);
            entry.target.textContent = count.toLocaleString();
            if (count >= target) clearInterval(timer);
          }, 30);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ─── Contact form submit ─── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#16a34a';
        this.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  /* ─── Sticky topbar shadow on scroll ─── */
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    window.addEventListener('scroll', () => {
      topbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 30px rgba(0,0,0,0.6)'
        : '0 2px 20px rgba(0,0,0,0.5)';
    }, { passive: true });
  }

  /* ─── Smooth hero scroll-down button ─── */
  const scrollBtn = document.querySelector('.scroll-down-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const target = document.querySelector('.hero-scroll-target');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ─── Travel History Carousel ─── */
  const carouselSlideWrapper = document.querySelector('.carousel-slide-wrapper');
  const carouselImgs = document.querySelectorAll('.carousel-img');
  const indicators = document.querySelectorAll('.indicator');
  const currentSlideSpan = document.querySelector('.current-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (carouselImgs.length > 0) {
    let currentSlide = 0;

    function updateCarousel() {
      // Update image position
      carouselSlideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update indicators
      indicators.forEach(ind => ind.classList.remove('active'));
      indicators[currentSlide].classList.add('active');

      // Update counter
      if (currentSlideSpan) currentSlideSpan.textContent = currentSlide + 1;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % carouselImgs.length;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + carouselImgs.length) % carouselImgs.length;
      updateCarousel();
    }

    // Navigation button events
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Indicator click events
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    // Initialize
    updateCarousel();
  }

});
