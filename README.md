# Galaxy Interior — website redesign concept

An independent, speculative redesign of [galaxyinterior.in](https://www.galaxyinterior.in/), the Nagpur interior design and turnkey execution studio at Gorewada Square, prepared for discussion. **Not the official website** and not commissioned by, affiliated with or endorsed by Galaxy Interior.

Two pages:

Direction: "the sample book on the counter" — each piece of work shown with the finishes visible in it, in the words customers use.

- `index.html` — homepage: hero walkthrough video, six pieces (TV unit, bed, wardrobe, kitchen, sofa, reception counter) with sampled finish swatches, a worked example of how percentage fees grow, four walkthrough films, the three steps, visit and free-estimate form.
- `kitchens/index.html` — modular kitchens: L-shaped plan drawing, three finished kitchens with swatches, what a kitchen project covers.

## Run locally

```bash
python3 -m http.server 8080      # or: npx serve .
# open http://localhost:8080/
node scripts/verify.mjs          # noindex, concept label, local links and anchors
```

## Stack

Plain HTML, CSS and one dependency-free script. No build step, no backend, no tracking. Relative links, so it works from a GitHub Pages sub-path (`/galaxy-interior-redesign-concept/`). Font: Archivo (Google Fonts; self-host for production).

Photographs, videos and the logo are **displayed from galaxyinterior.in, not stored here** (see `ASSETS.md`). If one cannot load, its frame shows a labelled placeholder or removes itself.

## The enquiry form

Validates name and an Indian mobile number, offers property type, rooms and timing, and shows a confirmation. **It sends and stores nothing.** A real build would post to the studio's WhatsApp or CRM with consent capture and spam protection.

## Publishing

- Get Galaxy Interior's written permission to show its logo, photographs and videos in this concept, and keep it on file (see `ASSETS.md`).
- Every page carries `noindex, nofollow`; `robots.txt` disallows crawling. The site stays labelled as an independent concept.
- Deploy with the manual workflow `.github/workflows/pages.yml` (Settings → Pages → Source: GitHub Actions, then Actions → Run workflow).
