const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primnav');
const mq = matchMedia('(min-width: 768px)');

function setMenu(open) {
  if (!btn || !nav) return;

  btn.setAttribute('aria-expanded', String(open));
  nav.hidden = !open;
}

function toggleMenu() {
  const open = btn.getAttribute('aria-expanded') === 'true';
  setMenu(!open);
}

if (btn && nav) {
  btn.addEventListener('click', toggleMenu);
}

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
    minute: '2-digit'
  });

  el.textContent = `${dato} · ${tid}`;
}

tick();
setInterval(tick, 1000);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mq.matches) {
    setMenu(false);
  }
});

function handleScreenChange(e) {
  if (!btn || !nav) return;

  if (e.matches) {
    nav.hidden = false;
    btn.setAttribute('aria-expanded', 'false');
    return;
  }

  setMenu(false);
}

handleScreenChange(mq);
mq.addEventListener('change', handleScreenChange);
