const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('primnav');
const mq = matchMedia('(min-width: 768px)');
const contactForm = document.querySelector('[data-contact-form]');

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

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const button = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector('.form-status');

    if (button) {
      button.textContent = 'Sender melding...';
      button.disabled = true;
    }

    if (status) {
      status.textContent = 'Sender meldingen videre til e-post.';
    }
  });
}
