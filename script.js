/* ============================================
   Nodetech Wallet — Landing Page Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // --- Mobile navigation toggle ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll reveal (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: just show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // --- Showcase tab switching ---
  const showcaseTabs = document.querySelectorAll('.showcase-tab');
  const showcasePanels = document.querySelectorAll('.showcase-panel');

  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update tab active state
      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panel visibility
      showcasePanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --- Code copy button ---
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.copy;
      const codeEl = document.getElementById(targetId);
      if (!codeEl) return;

      // Get plain text content
      const text = codeEl.textContent;

      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        } catch (e) {
          btn.textContent = 'Failed';
          setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        }
        document.body.removeChild(textarea);
      });
    });
  });

  // --- Constellation dots (hero background) ---
  const constellation = document.getElementById('constellation');

  if (constellation) {
    const dotCount = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 4}s`;
      dot.style.animationDuration = `${3 + Math.random() * 4}s`;

      // Vary dot sizes slightly
      const size = 1 + Math.random() * 2;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      fragment.appendChild(dot);
    }

    constellation.appendChild(fragment);
  }

  // --- Gradient text color support ---
  // Already handled by CSS, but adding a class for browsers that don't support background-clip
  const gradientTexts = document.querySelectorAll('.gradient-text');
  gradientTexts.forEach(el => {
    if (!CSS.supports('background-clip', 'text') && !CSS.supports('-webkit-background-clip', 'text')) {
      el.style.color = '#00f0ff';
    }
  });

})();
