// ── NAV scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`nav a[href="#${sec.id}"]`);
    if (!link) return;
    link.classList.toggle('active', y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
  });
});

// ── SCROLL FADE-IN ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── SKILL BARS animate on scroll ──
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.style.width; // trigger reflow
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const skillSection = document.getElementById('skills');
if (skillSection) barObserver.observe(skillSection);

// ── TYPEWRITER on hero name ──
const nameEl = document.getElementById('heroName');
if (nameEl) {
  const full = nameEl.textContent.trim();
  nameEl.textContent = '';
  let i = 0;
  setTimeout(() => {
    const type = () => { if (i < full.length) { nameEl.textContent += full[i++]; setTimeout(type, 65); } };
    type();
  }, 500);
}

// ── FOOTER YEAR ──
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ── STAGGER cards ──
document.querySelectorAll('.card').forEach((c, i) => {
  c.classList.add('fade-up');
  c.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(c);
});
