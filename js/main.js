// ==========================================================================
// Ryno Boshoff, CV site interactions
// ==========================================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- last-updated (from the served file's modified date) ---------- */
const lastUpdatedEl = document.getElementById('lastUpdated');
if (lastUpdatedEl) {
  const modDate = new Date(document.lastModified);
  if (!isNaN(modDate)) {
    lastUpdatedEl.textContent = modDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  // if document.lastModified can't be parsed, the static fallback text in the HTML stays as-is
}

/* ---------- sticky nav shadow on scroll ---------- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ---------- scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

/* ---------- hero terminal typing effect ---------- */
const termBody = document.getElementById('termBody');
const termScript = [
  { p: '$ ', t: 'whoami', out: false },
  { p: '', t: 'ryno_boshoff, IAM & Cybersecurity Engineer', out: true, cls: 'out' },
  { p: '$ ', t: 'status --role', out: false },
  { p: '', t: 'Senior Specialist: Security Solutions', out: true, cls: 'out' },
  { p: '', t: 'Altron Security, since 2022', out: true, cls: 'path' },
  { p: '$ ', t: 'ls ./skills', out: false },
  { p: '', t: 'PingFederate  PingAccess  PingDirectory', out: true, cls: 'tag' },
  { p: '', t: 'SailPoint ISC  OpenText  AWS', out: true, cls: 'tag' },
  { p: '', t: 'Linux  Claude', out: true, cls: 'tag' },
];

function typeLine(idx) {
  if (idx >= termScript.length) {
    // loop with a blinking cursor line at the end
    const cursorLine = document.createElement('div');
    cursorLine.className = 'term-line';
    cursorLine.innerHTML = '<span class="prompt">$</span> <span class="term-cursor"></span>';
    termBody.appendChild(cursorLine);
    return;
  }
  const step = termScript[idx];
  const line = document.createElement('div');
  line.className = 'term-line';
  termBody.appendChild(line);

  if (!step.out) {
    // typed command line
    let i = 0;
    const prefix = `<span class="prompt">${step.p}</span>`;
    const type = () => {
      line.innerHTML = prefix + step.t.slice(0, i);
      i++;
      if (i <= step.t.length) {
        setTimeout(type, 26);
      } else {
        setTimeout(() => typeLine(idx + 1), 220);
      }
    };
    type();
  } else {
    line.innerHTML = `<span class="${step.cls}">${step.t}</span>`;
    setTimeout(() => typeLine(idx + 1), 160);
  }
}

// Kick off once the hero is in view (or immediately if reduced motion is fine)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  termBody.innerHTML = termScript.map(s =>
    `<div class="term-line">${s.out ? `<span class="${s.cls}">${s.t}</span>` : `<span class="prompt">${s.p}</span>${s.t}`}</div>`
  ).join('');
} else {
  setTimeout(() => typeLine(0), 500);
}
