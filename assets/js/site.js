// Galaxy Interior concept. Progressive enhancement: everything reads and links without it.
const root = document.documentElement;

// Mobile navigation
const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) {
  const set = (open) => { toggle.setAttribute('aria-expanded', String(open)); root.classList.toggle('nav-open', open); };
  toggle.addEventListener('click', () => set(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => e.target.closest('a') && set(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('nav-open')) { set(false); toggle.focus(); } });
}

// Gallery filters
const filters = document.querySelectorAll('[data-filter]');
filters.forEach((btn) => btn.addEventListener('click', () => {
  filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  document.querySelectorAll('[data-gallery] .tile').forEach((t) => { t.hidden = !(btn.dataset.filter === 'all' || t.dataset.cat === btn.dataset.filter); });
}));

// Lightbox: buttons, arrow keys, swipe; focus returns to the opening photo
const lb = document.querySelector('[data-lightbox]');
if (lb) {
  const lbImg = lb.querySelector('[data-lb-img]');
  const lbCap = lb.querySelector('[data-lb-cap]');
  let list = []; let i = 0; let opener = null;
  const show = () => { const b = list[i]; lbImg.src = b.dataset.full; lbImg.alt = b.querySelector('img')?.alt || ''; lbCap.textContent = `${b.dataset.cap} (${i + 1} of ${list.length})`; };
  const open = (btn) => {
    list = [...document.querySelectorAll('[data-lb-open]')].filter((b) => !b.closest('.tile')?.hidden);
    i = list.indexOf(btn); opener = btn; show();
    lb.hidden = false; lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
    lb.querySelector('[data-lb-close]').focus();
  };
  const close = () => { lb.classList.remove('is-open'); lb.hidden = true; document.body.style.overflow = ''; opener?.focus(); };
  const step = (d) => { i = (i + d + list.length) % list.length; show(); };
  document.querySelectorAll('[data-lb-open]').forEach((b) => b.addEventListener('click', () => open(b)));
  lb.querySelector('[data-lb-close]').addEventListener('click', close);
  lb.querySelector('[data-lb-prev]').addEventListener('click', () => step(-1));
  lb.querySelector('[data-lb-next]').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'Tab') { // keep focus inside the viewer
      const f = [...lb.querySelectorAll('button')]; const first = f[0]; const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); x0 = null; });
}

// Walkthrough videos: muted, play on tap, one at a time
const reels = [...document.querySelectorAll('.reel')];
reels.forEach((reel) => {
  const v = reel.querySelector('video'); const btn = reel.querySelector('.reel__play');
  if (!v || !btn) return;
  v.addEventListener('error', () => reel.classList.add('is-missing'));
  btn.addEventListener('click', () => {
    reels.forEach((r) => { if (r !== reel) { r.querySelector('video')?.pause(); r.classList.remove('is-playing'); } });
    v.play().then(() => reel.classList.add('is-playing')).catch(() => {});
  });
  v.addEventListener('click', () => { v.pause(); reel.classList.remove('is-playing'); });
});

// Estimate form: demonstration only, nothing leaves the browser
const form = document.querySelector('[data-demo-form]');
if (form) {
  const note = form.querySelector('[data-form-note]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const name = String(d.get('name') || '').trim().split(' ')[0];
    form.reset();
    note.hidden = false;
    note.textContent = `Thanks${name ? `, ${name}` : ''}! On the live site, Galaxy Interior would now call you about your ${d.get('property')}. This concept doesn't send or store anything.`;
    note.focus();
  });
}
