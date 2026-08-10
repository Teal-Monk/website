/**
 * Popy Website - Main JavaScript
 * Handles animations and interactions
 */

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

// ============================================
// Feature Tabs
// ============================================
function initFeatureTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Update buttons
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      const targetPanel = document.querySelector(`.tab-panel[data-tab="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');

        // Scroll so the full tab section (nav + panel) is visible
        const panelRect = targetPanel.getBoundingClientRect();
        const headerOffset = 80;
        const panelNotVisible = panelRect.bottom > window.innerHeight || panelRect.top < headerOffset;

        if (panelNotVisible) {
          const tabNav = document.querySelector('.tab-nav');
          const scrollTo = (tabNav || targetPanel).getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignore empty hash or hash-only links
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Platform Detection for Download Buttons
// ============================================
function detectPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMac = /mac|iphone|ipad|ipod/.test(userAgent);
  const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);

  return {
    isMac,
    isChrome
  };
}

// ============================================
// FAQ Toggle (if needed in future)
// ============================================
function initFAQToggle() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      faqItems.forEach(i => i.classList.remove('open'));

      // Toggle clicked item (open if it was closed)
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// ============================================
// Hamburger Menu
// ============================================
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    }
  });
}

// ============================================
// Initialize Everything
// ============================================
function init() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }
}

function runInit() {
  initHeaderScroll();
  initHamburger();
  initFeatureTabs();
  initSmoothScroll();
  initFAQToggle();

  // Add platform detection info (can be used for conditional UI)
  const platform = detectPlatform();
  document.body.dataset.platform = platform.isMac ? 'mac' : 'other';
  document.body.dataset.browser = platform.isChrome ? 'chrome' : 'other';
}

// Start the app
init();

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initHeaderScroll,
    initFeatureTabs,
    initSmoothScroll,
    detectPlatform
  };
}
