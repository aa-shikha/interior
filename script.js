document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Variables Selectors ---
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const slides = document.querySelectorAll('.hero-slider .slide');

  // --- 2. Navbar Scroll Effect ---
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // --- 3. Hamburger Menu (Full width, half height overlay) ---
  function openMenu() {
    menuToggle.classList.add('active');
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  if (menuToggle && navMenu && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    menuOverlay.addEventListener('click', closeMenu);

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  // --- 4. Hero Slider (Har 3 Second me Auto Change) ---
  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 3000;

    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    };

    setInterval(nextSlide, slideInterval);
  }

  // --- 5. About Section: Image left se, Text right se ---
  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    const aboutVisuals = aboutSection.querySelector('.about-visuals');
    const aboutContent = aboutSection.querySelector('.about-content');

    const showAbout = (el) => {
      el.classList.add('in-view');
      aboutSection.classList.add('animate'); 
    };

    if ('IntersectionObserver' in window) {
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            showAbout(entry.target);
            aboutObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      if (aboutVisuals) aboutObserver.observe(aboutVisuals);
      if (aboutContent) aboutObserver.observe(aboutContent);
    } else {
     
      if (aboutVisuals) showAbout(aboutVisuals);
      if (aboutContent) showAbout(aboutContent);
    }
  }

   // --- 6. Services Section ---
  const servicesSection = document.querySelector('.services-section');
  if (servicesSection) {
    // Desktop: poora section ek saath trigger (stagger delay CSS se aati hai)
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          servicesSection.classList.add('animate');
          servicesObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    servicesObserver.observe(servicesSection);

    // Tablet/Mobile: header aur har card apne scroll par alag trigger hote hain
    const servicesHeader = servicesSection.querySelector('.services-header');
    const serviceCards = servicesSection.querySelectorAll('.service-card');

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          itemObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    if (servicesHeader) itemObserver.observe(servicesHeader);
    serviceCards.forEach(card => itemObserver.observe(card));
  }

  // --- 7. Projects Section: Row-by-Row Scroll Animation ---
  const projectsSection = document.querySelector('.projects-section');

  if (projectsSection) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          projectsSection.classList.add('header-visible');
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    headerObserver.observe(projectsSection);

    const projectCards = document.querySelectorAll('.project-card');

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    projectCards.forEach(card => cardObserver.observe(card));
  }

  // --- Philosophy: scroll par center wala point highlight ---
  const philPoints = document.querySelectorAll('.phil-point-card');
  if (philPoints.length > 0 && 'IntersectionObserver' in window) {
    const philObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          philPoints.forEach(p => p.classList.remove('active'));
          entry.target.classList.add('active');
        }
      });
    }, {
      rootMargin: '-40% 0px -40% 0px',  
      threshold: 0
    });

    philPoints.forEach(p => philObserver.observe(p));
  }

    // --- Testimonials Section: Scroll Animation ---
  const testimonialsSection = document.querySelector('.testimonials-section');
  if (testimonialsSection) {
    const testimonialItems = testimonialsSection.querySelectorAll(
      '.testimonials-header, .testimonial-card, .testimonials-footer-note'
    );

    if ('IntersectionObserver' in window) {
      const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            testimonialObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      testimonialItems.forEach(item => testimonialObserver.observe(item));
    } else {
      // Purane browsers: 
      testimonialItems.forEach(item => item.classList.add('in-view'));
    }
  }
   // --- Contact Section: Scroll Animation ---
  const contactTargets = document.querySelectorAll(
    '.contact-header, .contact-img-wrap, .contact-form-card'
  );

  if (contactTargets.length > 0) {
    if ('IntersectionObserver' in window) {
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            contactObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      contactTargets.forEach(el => contactObserver.observe(el));
    } else {
      contactTargets.forEach(el => el.classList.add('in-view'));
    }
  }
    // --- 8. FAQ Accordion + Scroll Animation ---
  const faqItems = document.querySelectorAll('.faq-item');

  // Answer ki height uske content ke hisaab se set karo
  const setAnswerHeight = (item, open) => {
    const answer = item.querySelector('.faq-answer');
    if (!answer) return;
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '';
  };

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const currentItem = button.closest('.faq-item');
      const isActive = currentItem.classList.contains('active');

      // Baaki sabhi open items band karo
      faqItems.forEach(item => {
        item.classList.remove('active');
        setAnswerHeight(item, false);
      });

      // Agar pehle band tha to kholo
      if (!isActive) {
        currentItem.classList.add('active');
        setAnswerHeight(currentItem, true);
      }
    });
  });

  // Screen resize par khula answer cut na ho
  window.addEventListener('resize', () => {
    const openItem = document.querySelector('.faq-item.active');
    if (openItem) setAnswerHeight(openItem, true);
  });

  // Scroll animation: left side aur har question alag trigger
  const faqLeft = document.querySelector('.faq-left-sticky');
  const faqAnimTargets = [];
  if (faqLeft) faqAnimTargets.push(faqLeft);
  faqItems.forEach(item => faqAnimTargets.push(item));

  if (faqAnimTargets.length > 0) {
    if ('IntersectionObserver' in window) {
      const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            faqObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      faqAnimTargets.forEach(el => faqObserver.observe(el));
    } else {
      faqAnimTargets.forEach(el => el.classList.add('in-view'));
    }
  }
  
   // --- 9. Footer Scroll Animation  ---
  const footerTargets = document.querySelectorAll(
    '.footer-col-brand, .footer-col-explore, .footer-col-cta, .footer-bottom'
  );

  if (footerTargets.length > 0) {
    if ('IntersectionObserver' in window) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            footerObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      });

      footerTargets.forEach(el => footerObserver.observe(el));
    } else {
      footerTargets.forEach(el => el.classList.add('in-view'));
    }
  }

  // --- 10. Inquiry Form: Inline Thank You State ---
  const inquiryForm = document.getElementById('inquiryForm');
  const formContentWrap = document.getElementById('formContentWrap');
  const thankYouState = document.getElementById('thankYouState');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (formContentWrap) {
        formContentWrap.style.display = 'none';
      }

      if (thankYouState) {
        thankYouState.classList.add('is-visible');
        thankYouState.style.display = 'flex';
      }
    });
  }
});