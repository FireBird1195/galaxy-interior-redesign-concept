# Galaxy Interior — website redesign concept

An independent, speculative redesign of [galaxyinterior.in](https://www.galaxyinterior.in/), the Nagpur interior design and turnkey execution studio at Gorewada Square, prepared for discussion. **Not the official website** and not commissioned by, affiliated with or endorsed by Galaxy Interior.

Two pages:

- `index.html` — homepage: "See your home before it's built" — rooms register (kitchens, bedrooms and wardrobes, living rooms, workspaces), walkthrough videos, how fees work (no percentage-based fees), the three-step process, services by need, studio facts, free-estimate form.
- `kitchens/index.html` — modular kitchens: why the L-shaped layout works (original plan drawing), finished kitchens, what a kitchen project covers.

## Run locally

```bash
python3 -m http.server 8080      # or: npx serve .
# open http://localhost:8080/
node scripts/verify.mjs          # noindex, concept label, local links and anchors
```

## Stack

Plain HTML, CSS and one dependency-free script. No build step, no backend, no tracking. Relative links, so it works from a GitHub Pages sub-path (`/galaxy-interior-redesign-concept/`). Fonts: Instrument Serif and Manrope (Google Fonts; self-host for production).

Photographs, videos and the logo are **displayed from galaxyinterior.in, not stored here** (see `ASSETS.md`). If one cannot load, its frame shows a labelled placeholder or removes itself.

## The enquiry form

Validates name and an Indian mobile number, offers property type, rooms and timing, and shows a confirmation. **It sends and stores nothing.** A real build would post to the studio's WhatsApp or CRM with consent capture and spam protection.

## Publishing

- Galaxy Interior has given permission to show its logo, photographs and videos in this concept (see `ASSETS.md`).
- Every page carries `noindex, nofollow`; `robots.txt` disallows crawling. The site stays labelled as an independent concept.
- Deploy: Settings → Pages → Source: Deploy from a branch → `main` / `(root)`. No build step is needed.
