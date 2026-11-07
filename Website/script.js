/* ==========================================================================
   Sadeed Kamil - Portfolio Interactive Logic & Client Systems
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  initTheme();

  // 2. Navigation & Mobile Menu
  initNavigation();

  // 3. Dynamic Hero Typing Effect
  initTypingEffect();

  // 4. Animated Numerical Counters
  initStatsCounter();

  // 5. Skills Category Filter & Progress Bar Animations
  initSkills();

  // 6. Project Filter & Modal Previews
  initProjects();

  // 7. Client Project Contact Form System
  initClientContactForm();

  // 8. Client Feedback & Review System with LocalStorage
  initFeedbackSystem();

  // 9. Back To Top
  initBackToTop();

  // 10. Hire Me Modal & Backend Email Connection
  initHireModal();

  // 11. Ultra-Smooth Scroll Reveal System
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Theme Management
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('sadeed_theme') || 'dark';

  setTheme(storedTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme, true);
    });
  }

  function setTheme(theme, notify) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sadeed_theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
      } else {
        themeIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
      }
    }

    if (notify) {
      showToast('Theme Changed', `Switched to ${theme} mode`, 'theme');
    }
  }
}

/* --------------------------------------------------------------------------
   2. Navigation & Mobile Menu & Scroll Spy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for active section link
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinkItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Dynamic Hero Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const targetElement = document.getElementById('typed-role');
  if (!targetElement) return;

  const roles = [
    'Full-Stack Web Developer',
    'Modern UI/UX Engineer',
    'JavaScript & React Specialist',
    'Creative Problem Solver',
    'Bano Qabil Certified Dev'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      targetElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      targetElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Numerical Stats Counter Animation
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800;
          const step = Math.ceil(target / (duration / 25));
          let count = 0;

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target + (counter.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              counter.textContent = count + (counter.getAttribute('data-suffix') || '');
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. Skills Filter & Progress Bars
   -------------------------------------------------------------------------- */
function initSkills() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  // Animate skill progress bars on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) observer.observe(skillsGrid);

  // Skill category tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Projects Filter & Interactive Modal
   -------------------------------------------------------------------------- */
const projectsData = {
  1: {
    title: 'DataSphere SaaS Analytics Platform',
    category: 'Web Application',
    desc: 'An enterprise-grade SaaS analytics and metric performance platform with real-time revenue graphs, user conversion funnels, custom filters, and multi-tenant security.',
    tech: ['JavaScript ES6+', 'Chart.js', 'CSS Grid', 'REST APIs', 'Dark Mode'],
    image: 'assets/project1.jpg',
    features: [
      'Interactive financial and conversion charts',
      'Real-time metric updates with data caching',
      'Fully responsive responsive layouts for desktop & tablets',
      'Exportable CSV and PDF performance reports'
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  2: {
    title: 'Luxe & Tech E-Commerce Experience',
    category: 'Frontend & UI',
    desc: 'High-converting luxury retail storefront featuring dynamic product filtering, slide-out shopping bag, real-time checkout calculations, and responsive mobile navigation.',
    tech: ['HTML5', 'CSS3 Flexbox', 'JavaScript', 'LocalStorage', 'Responsive Design'],
    image: 'assets/project2.jpg',
    features: [
      'Dynamic cart drawer with quantity adjustments',
      'Multi-currency price formatter & tax estimation',
      'Category & price-range live filtering',
      'Instant search with debounce matching'
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  3: {
    title: 'Synergy Creative Digital Agency',
    category: 'UI/UX Design',
    desc: 'Futuristic portfolio and service landing page with 3D gradient glowing accents, interactive case-study carousels, client review carousels, and smooth micro-animations.',
    tech: ['Modern CSS', 'Vanilla JS', 'SVG Graphics', 'Glassmorphism', 'SEO Optimized'],
    image: 'assets/project3.jpg',
    features: [
      'Glassmorphic cards with dynamic hover glow',
      'Custom SVG vector icons and smooth scrolling',
      'Lead capture form with client validation',
      'High performance 95+ Google Lighthouse score'
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  4: {
    title: 'TaskFlow Agile Kanban Board',
    category: 'Web Application',
    desc: 'Collaborative task management tool with drag-and-drop workflow columns, priority tagging, deadline reminders, and local storage data persistence.',
    tech: ['JavaScript', 'HTML5 Drag & Drop', 'CSS Modern', 'LocalStorage'],
    image: 'assets/project1.jpg',
    features: [
      'Drag-and-drop card movements between stages',
      'Custom color-coded labels and priority tags',
      'Search and filter tasks by status',
      '100% offline functionality with LocalStorage'
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  5: {
    title: 'WeatherPulse Live Forecast Hub',
    category: 'Web Application',
    desc: 'Dynamic weather dashboard fetching real-time meteorological metrics, 7-day extended forecasts, UV index, and weather-adaptive background themes.',
    tech: ['Fetch API', 'OpenWeather API', 'JavaScript ES6+', 'CSS Variables'],
    image: 'assets/project2.jpg',
    features: [
      'Geolocation detection for instant weather',
      'Interactive hourly temperature curves',
      'Sunrise, sunset, and humidity indicators',
      'Smooth dark/light adaptive atmospheric styles'
    ],
    liveUrl: '#',
    codeUrl: '#'
  },
  6: {
    title: 'DevNexus Portfolio Creator',
    category: 'Frontend & UI',
    desc: 'Interactive personal portfolio generator allowing developers to customize sections, preview theme palettes in real time, and export production-ready HTML/CSS.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Blob API', 'UI Engine'],
    image: 'assets/project3.jpg',
    features: [
      'Real-time live split-screen editor',
      'Pre-built theme templates & typography pairings',
      'One-click zip export for deployment',
      'Accessible semantic structure out of the box'
    ],
    liveUrl: '#',
    codeUrl: '#'
  }
};

function initProjects() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Modal open buttons
  const previewBtns = document.querySelectorAll('.btn-project-preview');
  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-id');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        modalBackdrop.classList.remove('open');
      }
    });
  }

  function openProjectModal(id) {
    const data = projectsData[id];
    if (!data || !modalBackdrop) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-img').src = data.image;

    // Tech tags
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    // Features
    const featuresContainer = document.getElementById('modal-features');
    if (featuresContainer && data.features) {
      featuresContainer.innerHTML = data.features.map(f => `<li><span style="color:var(--accent-cyan); margin-right:8px;">✓</span>${f}</li>`).join('');
    }

    modalBackdrop.classList.add('open');
  }
}

/* --------------------------------------------------------------------------
   7. Backend Email System & Inquiry Handler
   -------------------------------------------------------------------------- */
const BACKEND_API_URL = 'http://localhost:5000/api/hire';

async function handleInquirySubmission({ name, email, service, budget, message, source }, submitBtn, formElement, modalToClose) {
  // Client-side Validation
  if (!name || name.length < 2) {
    showToast('Validation Error', 'Please enter your full name', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Validation Error', 'Please enter a valid email address', 'error');
    return;
  }

  if (!message || message.length < 6) {
    showToast('Validation Error', 'Please provide a brief description of your project', 'error');
    return;
  }

  // Set loading state
  const originalBtnContent = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
    </svg>
    <span>Sending to Sadeed...</span>
  `;

  const payload = {
    name,
    email,
    service: service || 'Web Development',
    budget: budget || 'Undisclosed',
    message,
    source: source || 'Portfolio Contact Form',
    timestamp: new Date().toISOString()
  };

  try {
    // 1. Attempt to send to local/production Express backend
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      formElement.reset();
      if (modalToClose) {
        modalToClose.classList.remove('open');
      }
      showToast(
        'Email Dispatched! 🚀',
        `Thank you ${name}. Your project details were successfully sent to Sadeed Kamil. Expect a reply within 24 hours.`,
        'success'
      );
      return;
    } else {
      throw new Error(`Server returned status ${response.status}`);
    }
  } catch (err) {
    console.warn('Backend server not currently active on localhost:5000. Activating direct mail client dispatch...', err);

    // Fallback: Reset form, close modal, and provide direct mail draft to sadeedkamil143@gmail.com
    formElement.reset();
    if (modalToClose) {
      modalToClose.classList.remove('open');
    }

    const mailtoSubject = encodeURIComponent(`Project Inquiry: ${service} from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Hi Sadeed,\n\nI would like to hire you for a project:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service: ${service}\n` +
      `Budget: ${budget}\n\n` +
      `Project Details:\n${message}\n\n` +
      `Best regards,\n${name}`
    );

    // Open mail client draft so the inquiry is 100% reachable
    const mailtoUrl = `mailto:sadeedkamil143@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.open(mailtoUrl, '_blank');

    showToast(
      'Inquiry Prepared! ✉️',
      `Thank you ${name}! Direct email draft to sadeedkamil143@gmail.com has been opened. (Tip: Start the backend server with 'npm start' in the backend/ directory for automated email dispatch!)`,
      'success'
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
  }
}

function initClientContactForm() {
  const contactForm = document.getElementById('client-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const service = document.getElementById('client-service').value;
    const budget = document.getElementById('client-budget').value;
    const message = document.getElementById('client-message').value.trim();
    const submitBtn = document.getElementById('contact-submit-btn');

    handleInquirySubmission({
      name,
      email,
      service,
      budget,
      message,
      source: 'On-Page Contact Form'
    }, submitBtn, contactForm, null);
  });
}

/* --------------------------------------------------------------------------
   8. Client Feedback & Review System with LocalStorage
   -------------------------------------------------------------------------- */
const defaultReviews = [
  {
    id: 1,
    name: 'Hamza Farooq',
    role: 'Startup Founder & CEO',
    rating: 5,
    title: 'Outstanding Web Performance & Design!',
    text: 'Sadeed delivered our SaaS landing page ahead of schedule. The responsiveness and sleek dark-mode aesthetics completely exceeded our expectations. Highly recommended!',
    date: 'Sep 02, 2026'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Product Manager, NexaTech',
    rating: 5,
    title: 'Clean Code and Great Communication',
    text: 'Collaborating with Sadeed was effortless. He has a sharp eye for modern UI details, implements clean semantic code, and solves edge cases proactively.',
    date: 'Aug 24, 2026'
  },
  {
    id: 3,
    name: 'Bilal Ahmed',
    role: 'Instructor, Bano Qabil',
    rating: 5,
    title: 'Dedicated Developer & Fast Learner',
    text: 'Sadeed demonstrated exceptional dedication during our web development program. His grasp of modern JavaScript and responsive layouts is top tier.',
    date: 'Aug 10, 2026'
  }
];

function initFeedbackSystem() {
  const starsContainer = document.getElementById('star-rating-inputs');
  const ratingValueInput = document.getElementById('selected-rating-value');
  const feedbackForm = document.getElementById('client-feedback-form');
  const reviewsList = document.getElementById('reviews-cards-list');
  const avgRatingBadge = document.getElementById('average-rating-badge');

  let selectedRating = 5;

  // Star selector interaction
  if (starsContainer) {
    const stars = starsContainer.querySelectorAll('.star-icon');

    function highlightStars(count) {
      stars.forEach((star, index) => {
        if (index < count) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }

    highlightStars(selectedRating);

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const rating = +star.getAttribute('data-value');
        highlightStars(rating);
      });

      star.addEventListener('mouseleave', () => {
        highlightStars(selectedRating);
      });

      star.addEventListener('click', () => {
        selectedRating = +star.getAttribute('data-value');
        if (ratingValueInput) ratingValueInput.value = selectedRating;
        highlightStars(selectedRating);
      });
    });
  }

  // Load reviews from localStorage or load defaults
  let storedReviews = [];
  try {
    const localData = localStorage.getItem('sadeed_reviews');
    if (localData) {
      storedReviews = JSON.parse(localData);
    } else {
      storedReviews = defaultReviews;
      localStorage.setItem('sadeed_reviews', JSON.stringify(storedReviews));
    }
  } catch (e) {
    storedReviews = defaultReviews;
  }

  renderReviews(storedReviews);

  // Handle new feedback submission
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reviewer-name').value.trim();
      const role = document.getElementById('reviewer-role').value.trim() || 'Client';
      const comment = document.getElementById('reviewer-comment').value.trim();

      if (!name || name.length < 2) {
        showToast('Validation Error', 'Please enter your name', 'error');
        return;
      }

      if (!comment || comment.length < 5) {
        showToast('Validation Error', 'Please write a brief feedback comment', 'error');
        return;
      }

      const newReview = {
        id: Date.now(),
        name: name,
        role: role,
        rating: selectedRating,
        title: `${selectedRating} Star Client Review`,
        text: comment,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };

      storedReviews.unshift(newReview);
      localStorage.setItem('sadeed_reviews', JSON.stringify(storedReviews));

      renderReviews(storedReviews, newReview.id);
      feedbackForm.reset();
      selectedRating = 5;
      if (starsContainer) {
        starsContainer.querySelectorAll('.star-icon').forEach(s => s.classList.add('active'));
      }

      showToast('Thank You! 🌟', 'Your feedback review has been posted successfully.', 'success');
    });
  }

  function renderReviews(reviews, highlightId = null) {
    if (!reviewsList) return;

    // Calculate Average Rating
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / reviews.length).toFixed(1);
    if (avgRatingBadge) {
      avgRatingBadge.innerHTML = `★ ${avg} / 5.0 (${reviews.length} Reviews)`;
    }

    reviewsList.innerHTML = reviews.map(r => {
      const initials = r.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const starIcons = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      const isNewClass = r.id === highlightId ? 'newly-added' : '';

      return `
        <div class="review-card ${isNewClass}">
          <div class="review-card-header">
            <div class="reviewer-meta">
              <div class="reviewer-avatar">${initials}</div>
              <div>
                <div class="reviewer-name">${escapeHtml(r.name)}</div>
                <div class="reviewer-role">${escapeHtml(r.role)}</div>
              </div>
            </div>
            <div class="review-stars">${starIcons}</div>
          </div>
          <div class="review-body">${escapeHtml(r.text)}</div>
          <div class="review-date" style="margin-top: 10px;">${r.date}</div>
        </div>
      `;
    }).join('');
  }
}

/* --------------------------------------------------------------------------
   9. Helper Utilities: Toast Notifications & Back To Top
   -------------------------------------------------------------------------- */
function showToast(title, message, type = 'info') {
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  if (type === 'success') {
    toastIcon.innerHTML = '✓';
    toastIcon.style.color = 'var(--accent-emerald)';
  } else if (type === 'error') {
    toastIcon.innerHTML = '✕';
    toastIcon.style.color = 'var(--accent-pink)';
  } else {
    toastIcon.innerHTML = 'ℹ';
    toastIcon.style.color = 'var(--accent-yellow)';
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   10. Dedicated 'Hire Me' Modal System
   -------------------------------------------------------------------------- */
function initHireModal() {
  const hireModal = document.getElementById('hire-modal');
  const closeBtn = document.getElementById('hire-modal-close-btn');
  const hireForm = document.getElementById('hire-modal-form');
  const navHireBtn = document.getElementById('nav-contact-cta');
  const footerHireLink = document.getElementById('footer-hire-link');
  const heroHireBtn = document.getElementById('hero-cta-hire');

  if (!hireModal) return;

  function openHireModal(e) {
    if (e) e.preventDefault();
    hireModal.classList.add('open');
    hireModal.setAttribute('aria-hidden', 'false');

    // Fire-and-forget ping to backend when client clicks Hire Me
    try {
      fetch('http://localhost:5000/api/hire-ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          trigger: e && e.target ? (e.target.id || e.target.textContent || 'Hire CTA') : 'Direct Click'
        })
      }).catch(() => {});
    } catch (_) {}

    const firstInput = document.getElementById('hire-name');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeHireModal() {
    hireModal.classList.remove('open');
    hireModal.setAttribute('aria-hidden', 'true');
  }

  // Trigger buttons
  if (navHireBtn) navHireBtn.addEventListener('click', openHireModal);
  if (footerHireLink) footerHireLink.addEventListener('click', openHireModal);
  if (heroHireBtn) heroHireBtn.addEventListener('click', openHireModal);

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeHireModal);

  hireModal.addEventListener('click', (e) => {
    if (e.target === hireModal) {
      closeHireModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hireModal.classList.contains('open')) {
      closeHireModal();
    }
  });

  // Hire Form Submission
  if (hireForm) {
    hireForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('hire-name').value.trim();
      const email = document.getElementById('hire-email').value.trim();
      const service = document.getElementById('hire-service').value;
      const budget = document.getElementById('hire-budget').value;
      const message = document.getElementById('hire-message').value.trim();
      const submitBtn = document.getElementById('hire-modal-submit-btn');

      handleInquirySubmission({
        name,
        email,
        service,
        budget,
        message,
        source: 'Hire Me Modal'
      }, submitBtn, hireForm, hireModal);
    });
  }
}

/* --------------------------------------------------------------------------
   11. Ultra-Smooth Scroll Reveal System
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const revealElements = document.querySelectorAll(
    '.section-header, .stat-card, .about-text, .hero-card, .skill-card, .timeline-item, .project-card, .review-card, .contact-info-card, .client-form-card'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger items slightly for dynamic waterfall effect
    if (index % 4 === 1) el.style.transitionDelay = '0.08s';
    if (index % 4 === 2) el.style.transitionDelay = '0.16s';
    if (index % 4 === 3) el.style.transitionDelay = '0.24s';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}
