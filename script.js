const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primnav');
const mq = matchMedia('(min-width: 768px)');

// toggle meny på mobil
function toggleMenu() {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  nav.hidden = open; // hvis åpen -> skjul, hvis lukket -> vis
}

if (btn && nav) {
  btn.addEventListener('click', toggleMenu);
}

// klokke
function tick() {
  const el = document.getElementById('klokke');
  if (!el) return;

  const now = new Date();

  const dato = now.toLocaleDateString('no-NO', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const tid = now.toLocaleTimeString('no-NO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  el.textContent = `${dato} • ${tid}`;
}

tick();
setInterval(tick, 1000);

// Lukk med Escape på mobil
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mq.matches && btn && nav) {
    btn.setAttribute('aria-expanded', 'false');
    nav.hidden = true;
  }
});

// håndter mobil/desktop-visning
function handleScreenChange(e) {
  if (!nav || !btn) return;

  if (e.matches) {
    // >= 768px: alltid vis meny, ingen burgerlogikk
    nav.hidden = false;
    btn.setAttribute('aria-expanded', 'false');
  } else {
    // < 768px: start med meny lukket
    nav.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }
}

handleScreenChange(mq);
mq.addEventListener('change', handleScreenChange);
