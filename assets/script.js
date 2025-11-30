// Small UI interactions: mobile menu, theme toggle, filters, copy email
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.style.display === 'block';
      nav.style.display = isOpen ? '' : 'block';
    });
  }

  // Theme toggle with localStorage
  const themeToggle = document.getElementById('theme-toggle');
  function getPreferredTheme(){
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(t){
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', t);
  }
  applyTheme(getPreferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Project filters
  const filters = document.querySelectorAll('.filter');
  const projectGrid = document.getElementById('project-grid');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      if (!projectGrid) return;
      const cards = projectGrid.querySelectorAll('.project-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Copy email button
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'you@example.com'; // replace with your email
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy email'), 1500);
      } catch (e) {
        alert('Copy failed — email: ' + email);
      }
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});
