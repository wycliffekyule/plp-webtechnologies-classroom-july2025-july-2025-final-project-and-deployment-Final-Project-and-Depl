/* js/main.js
   Central JS for interactivity: navigation toggle, accordion, contact form validation, gallery lightbox, and scroll reveal.
*/

/* Utility: document ready */
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in all pages
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // Mobile nav toggle (works across pages)
  const navToggle = document.querySelectorAll('#navToggle');
  navToggle.forEach(btn => {
    btn.addEventListener('click', function() {
      const nav = document.getElementById('primaryNav');
      const expanded = btn.getAttribute('aria-expanded') === 'true' || false;
      btn.setAttribute('aria-expanded', !expanded);
      if (nav) nav.style.display = expanded ? 'none' : 'block';
    });
  });

  // FAQ accordion
  const accordions = document.querySelectorAll('.accordion-toggle');
  accordions.forEach(btn => {
    btn.addEventListener('click', function() {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const panel = btn.nextElementSibling;
      if (!expanded) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = null;
      }
    });
  });

  // Gallery lightbox
  const gallery = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  if (gallery && lightbox) {
    gallery.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      const src = img.getAttribute('data-full') || img.src;
      lightboxImg.src = src;
      lightboxImg.alt = img.alt || '';
      lightboxTitle.textContent = img.alt || '';
      lightbox.style.display = 'grid';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      closeLightbox();
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    function closeLightbox(){
      lightbox.style.display = 'none';
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }
    // close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'grid') closeLightbox();
    });
  }

  // Contact form validation (client-side only)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // basic validation
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const setError = (el, msg) => {
        const err = document.getElementById('error-' + el.id);
        if (err) err.textContent = msg;
        el.setAttribute('aria-invalid', !!msg);
      };
      // Name
      if (!name.value || name.value.trim().length < 2) {
        setError(name, 'Please enter your name (2+ characters).');
        valid = false;
      } else setError(name, '');
      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value || !emailPattern.test(email.value)) {
        setError(email, 'Please enter a valid email.');
        valid = false;
      } else setError(email, '');
      // Message
      if (!message.value || message.value.trim().length < 10) {
        setError(message, 'Message must be at least 10 characters.');
        valid = false;
      } else setError(message, '');

      const status = document.getElementById('formStatus');
      if (!valid) {
        status.textContent = 'Please fix errors above.';
        return;
      }

      // Simulate form submission (replace with real endpoint like Netlify forms or API)
      status.textContent = 'Sending...';
      // Fake async call
      setTimeout(() => {
        status.textContent = 'Message sent — thanks! I will reply soon.';
        form.reset();
      }, 700);
    });
  }

  // Simple scroll reveal: add .visible when element in viewport
  const revealElems = document.querySelectorAll('.reveal');
  if (revealElems.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElems.forEach(el => io.observe(el));
  }
});
