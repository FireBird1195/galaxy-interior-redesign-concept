// Galaxy Interior concept — progressive enhancement only. The pages read and navigate without it.
const root = document.documentElement;
root.classList.add('js');

// Photos already in cache can finish loading before the inline onload is attached.
document.querySelectorAll('.photo__frame img').forEach((img) => {
  if (img.complete) img.naturalWidth ? img.classList.add('is-loaded') : img.closest('.photo')?.classList.add('is-missing');
});

// Mobile navigation
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  const set = (open) => { toggle.setAttribute('aria-expanded', String(open)); root.classList.toggle('nav-open', open); };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => e.target.closest('a') && set(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { set(false); toggle.focus(); }
  });
}

// Blocks settle as they enter the viewport
const seen = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); seen.unobserve(e.target); }
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
document.querySelectorAll('[data-reveal]').forEach((el) => seen.observe(el));

// Rooms register: the photo pane follows the row being pointed at or focused
const rows = document.querySelectorAll('[data-room-row]');
const panes = document.querySelectorAll('[data-room-pane]');
const show = (id) => {
  panes.forEach((p) => p.classList.toggle('is-active', p.dataset.roomPane === id));
  rows.forEach((r) => r.classList.toggle('is-active', r.dataset.roomRow === id));
};
rows.forEach((r) => {
  r.addEventListener('pointerenter', () => show(r.dataset.roomRow));
  r.addEventListener('focusin', () => show(r.dataset.roomRow));
  r.addEventListener('click', () => show(r.dataset.roomRow));
});

// Walkthrough reels: tap to play one at a time, muted
const reels = document.querySelectorAll('.reel');
reels.forEach((reel) => {
  const video = reel.querySelector('video');
  const btn = reel.querySelector('.reel__play');
  if (!video || !btn) return;
  video.addEventListener('error', () => reel.classList.add('is-missing'));
  const stop = () => { video.pause(); reel.classList.remove('is-playing'); };
  btn.addEventListener('click', () => {
    reels.forEach((r) => { if (r !== reel) { r.querySelector('video')?.pause(); r.classList.remove('is-playing'); } });
    video.play().then(() => reel.classList.add('is-playing')).catch(() => {});
  });
  video.addEventListener('click', stop);
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
    note.textContent = `Thank you${name ? `, ${name}` : ''}. This is a concept preview, so nothing was sent or stored. On the live site, your ${data.get('property')}${scope.length ? ` (${scope.join(', ').toLowerCase()})` : ''} enquiry would reach the studio directly.`;
    note.focus();
  });
}
