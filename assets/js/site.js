// Galaxy Interior concept. Progressive enhancement only: pages read and navigate without it.

// Mobile navigation
const root = document.documentElement;
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  const set = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    root.classList.toggle('nav-open', open);
  };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => e.target.closest('a') && set(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { set(false); toggle.focus(); }
  });
}

// Walkthrough films: muted, play on request, one at a time
const films = [...document.querySelectorAll('.film')];
films.forEach((film) => {
  const video = film.querySelector('video');
  const btn = film.querySelector('.film__play');
  if (!video || !btn) return;
  video.addEventListener('error', () => film.classList.add('is-missing'));
  const pause = () => { video.pause(); film.classList.remove('is-playing'); btn.textContent = 'Play'; };
  btn.addEventListener('click', () => {
    if (!video.paused) return pause();
    films.forEach((f) => f !== film && f.querySelector('video')?.pause());
    films.forEach((f) => { if (f !== film) { f.classList.remove('is-playing'); const b = f.querySelector('.film__play'); if (b) b.textContent = 'Play'; } });
    video.play().then(() => { film.classList.add('is-playing'); btn.textContent = 'Pause'; }).catch(() => {});
  });
  video.addEventListener('ended', pause);
});

// Enquiry form: demonstration only. Nothing leaves the browser.
const form = document.querySelector('[data-demo-form]');
if (form) {
  const note = form.querySelector('[data-form-note]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim().split(' ')[0];
    const scope = data.getAll('scope');
    form.reset();
    note.hidden = false;
    note.textContent = `Thank you${name ? `, ${name}` : ''}. This is a concept preview, so nothing was sent or stored. On the live site, your ${data.get('property')} enquiry${scope.length ? ` (${scope.join(', ').toLowerCase()})` : ''} would go straight to the showroom.`;
    note.focus();
  });
}
