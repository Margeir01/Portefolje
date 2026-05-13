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
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector('.form-status');
    const formData = new FormData(contactForm);
    const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

    if (button) {
      button.textContent = 'Sender melding...';
      button.disabled = true;
    }

    if (status) {
      status.classList.remove('is-error', 'is-success');
      status.textContent = 'Sender meldingen videre til e-post.';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok || result.success === 'false') {
        throw new Error(result.message || 'Meldingen kunne ikke sendes.');
      }

      contactForm.reset();

      if (status) {
        status.classList.add('is-success');
        status.textContent = 'Takk! Meldingen er sendt.';
      }
    } catch (error) {
      if (status) {
        status.classList.add('is-error');
        status.textContent = 'Noe gikk galt. Prøv igjen, eller send e-post direkte.';
      }
    } finally {
      if (button) {
        button.textContent = 'Send melding';
        button.disabled = false;
      }
    }
  });
}
