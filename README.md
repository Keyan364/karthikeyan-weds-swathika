# Meera & Arjun — Wedding Invitation Website

A single-page, animated wedding invitation: temple-door opening intro, glowing
kuthu vilakku lamps, falling petals, gold-foil type, live countdowns, photo
gallery, map + QR, add-to-calendar, WhatsApp share, and installable PWA.

## 1. Customize your details

Open **`js/config.js`** — every editable field (names, dates, venues,
WhatsApp number, gallery filenames, site URL) lives in one place. You don't
need to touch any other file for basic changes.

```js
coupleNames: "Meera & Arjun",
wedding: { dateISO: "2026-12-14T07:00:00+05:30", venueName: "...", ... },
reception: { ... },
whatsapp: { number: "91XXXXXXXXXX", ... }
```

⚠️ `dateISO` must include your timezone offset (e.g. `+05:30` for IST) or the
countdown will be wrong for guests in other timezones.

## 2. Add your own photos

Drop images into `assets/photos/` using the filenames listed in
`config.js` → `gallery` (or edit that list to match your own filenames).
Any aspect ratio works — they're cropped to fit.

## 3. Add background music

Add an MP3 to `assets/audio/bgm.mp3`. Use music you have the rights to use
(royalty-free instrumental tracks work well) — GitHub Pages is public, so
avoid copyrighted commercial tracks. If no file is present, the mute/unmute
button simply does nothing when tapped, and everything else still works.

## 4. Update the app icon (optional)

Replace `assets/icons/icon-192.png` and `icon-512.png` with your own square
artwork if you'd like a custom "Add to Home Screen" icon.

## 5. Host it free on GitHub Pages

1. Create a new **public** GitHub repository (e.g. `wedding-invite`).
2. Upload everything in this folder to the repository root (keep the folder
   structure intact).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**,
   branch **main**, folder **/(root)**. Save.
5. GitHub gives you a URL like:
   `https://yourusername.github.io/wedding-invite/`
6. Open `js/config.js` and set `siteUrl` to that exact URL (used for the QR
   code and WhatsApp share link), then re-upload the file.

That URL is what you share with guests — it works on any phone or computer,
no app required, and guests can "Add to Home Screen" for a native app feel.

## 6. Test locally before publishing (optional)

Any static file server works, e.g. with Python installed:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Opening `index.html`
directly via `file://` will work for most features, but service-worker/PWA
install requires a real server — GitHub Pages provides this automatically.)

## What's inside

```
index.html          Page structure
css/style.css        Design system + animations
js/config.js         ← edit this for your details
js/script.js          Door animation, petals, countdown, gallery, calendar, QR, share
manifest.json         PWA metadata
sw.js                 Service worker (offline support)
assets/icons/         App icons
assets/photos/        Gallery images (replace with your own)
assets/audio/         Put bgm.mp3 here
```

## Notes

- All animation respects `prefers-reduced-motion` for accessibility.
- The gallery gracefully shows a placeholder label if an image file is
  missing, instead of a broken image icon.
- Calendar buttons offer both Google Calendar and a downloadable `.ics`
  file (Apple Calendar / Outlook).
- The QR code always points at whatever `siteUrl` is set to in `config.js`.
