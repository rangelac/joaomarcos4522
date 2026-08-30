const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');

document.body.classList.add('js-ready');

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Contato pelo site - ${data.get('nome')}`);
  const body = encodeURIComponent(`Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\n\nMensagem:\n${data.get('mensagem')}`);
  window.location.href = `mailto:joaomarcos_luz@hotmail.com?subject=${subject}&body=${body}`;
  if (status) status.textContent = 'Abrindo seu aplicativo de e-mail para enviar a mensagem.';
});
