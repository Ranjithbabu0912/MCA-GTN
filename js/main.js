/**
 * ==========================================================================
 * G.T.N. ARTS COLLEGE (AUTONOMOUS), DINDIGUL
 * DEPARTMENT OF MASTER OF COMPUTER APPLICATIONS (MCA)
 * CORE SCRIPTS & NAVIGATION CONTROLLER (main.js)
 * ==========================================================================
 * Manages responsive navigation, active page highlighting, back-to-top button,
 * accessible modal helpers, and client-side contact form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
  initActiveNavLink();
  initBackToTop();
  initContactForm();
  initGlobalModals();
});

/**
 * 1. RESPONSIVE MOBILE NAVIGATION
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.querySelector('.nav-backdrop');

  if (!toggleBtn || !navLinks) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('active');
    navLinks.classList.toggle('active', isOpen);
    if (backdrop) backdrop.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMenu(false));
  }

  const closeBtn = document.querySelector('.mobile-nav-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleMenu(false));
  }

  // Close when pressing Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  // Close when clicking any nav link on mobile
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1080) {
        toggleMenu(false);
      }
    });
  });
}

/**
 * 2. STICKY HEADER ELEVATION
 */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 3. ACTIVE NAV LINK DETECTION
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();

    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * 4. BACK TO TOP BUTTON
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  function checkScroll() {
    if (window.scrollY > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 5. CONTACT FORM VALIDATION & STATIC SUBMISSION HANDLING
 */
function initContactForm() {
  const contactForm = document.getElementById('department-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    // Helper validation
    function validateField(input, condition, errorMsg) {
      const formGroup = input.closest('.form-group');
      const feedback = formGroup.querySelector('.form-feedback');

      if (!condition) {
        formGroup.classList.add('has-error');
        if (feedback) feedback.textContent = errorMsg;
        isValid = false;
      } else {
        formGroup.classList.remove('has-error');
      }
    }

    validateField(nameInput, nameInput.value.trim().length >= 2, 'Please enter your full name (minimum 2 characters).');
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(emailInput, emailPattern.test(emailInput.value.trim()), 'Please enter a valid email address.');

    validateField(subjectInput, subjectInput.value.trim().length >= 3, 'Please provide an inquiry subject.');

    validateField(messageInput, messageInput.value.trim().length >= 10, 'Please enter your message (minimum 10 characters).');

    if (!isValid) {
      const firstError = contactForm.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // Static website submission handling: Prepare mailto draft and show confirmation dialog
    const name = encodeURIComponent(nameInput.value.trim());
    const email = encodeURIComponent(emailInput.value.trim());
    const subject = encodeURIComponent(`[MCA Website Query] ${subjectInput.value.trim()}`);
    const body = encodeURIComponent(
      `Name: ${nameInput.value.trim()}\n` +
      `Email: ${emailInput.value.trim()}\n` +
      `Subject: ${subjectInput.value.trim()}\n\n` +
      `Message:\n${messageInput.value.trim()}\n\n` +
      `---\nSent via G.T.N. Arts College MCA Department Web Portal`
    );

    const mailtoUrl = `mailto:mca@gtnartscollege.ac.in?subject=${subject}&body=${body}`;

    const modal = document.getElementById('contact-status-modal');
    if (modal) {
      const modalBody = document.getElementById('contact-status-modal-body');
      if (modalBody) {
        modalBody.innerHTML = `
          <div style="text-align:center; padding: 1rem 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: #E0F7FA; color: #0077B6; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; font-size: 1.75rem;">
              <i class="fa-solid fa-envelope-circle-check"></i>
            </div>
            <h3 style="color:#0F172A; margin-bottom: 0.5rem;">Inquiry Draft Prepared</h3>
            <p style="color:#475569; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Thank you, <strong>${nameInput.value.trim()}</strong>. Because this is a static portal, your inquiry can be dispatched directly to the official MCA Department email using your default email client.
            </p>
            <div style="display:flex; justify-content:center; gap: 0.75rem; flex-wrap:wrap;">
              <a href="${mailtoUrl}" class="btn btn-primary btn-sm" id="send-mailto-btn">
                <i class="fa-solid fa-paper-plane"></i> Launch Email App
              </a>
              <button class="btn btn-secondary btn-sm" onclick="closeContactStatusModal()">Close</button>
            </div>
          </div>
        `;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      contactForm.reset();
    } else {
      window.location.href = mailtoUrl;
    }
  });
}

function closeContactStatusModal() {
  const modal = document.getElementById('contact-status-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * 6. GLOBAL ACCESSIBLE MODALS HELPERS
 */
function initGlobalModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}
