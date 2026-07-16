/* =========================================================
   MEERA & ARJUN — WEDDING INVITATION
   Vanilla JS + GSAP + AOS. All content driven by js/config.js
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  const cfg = window.WEDDING_CONFIG;

  /* ---------------- populate content from config ---------------- */
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

  setText('hero-date-text', cfg.heroDateText);
  setText('cd-wedding-label', cfg.wedding.label);
  setText('cd-wedding-sub', cfg.wedding.dateDisplay);
  setText('cd-reception-label', cfg.reception.label);
  setText('cd-reception-sub', cfg.reception.dateDisplay);
  setText('ev-wedding-label', cfg.wedding.label);
  setText('ev-wedding-date', cfg.wedding.dateDisplay);
  setText('ev-wedding-venue', cfg.wedding.venueName);
  setText('ev-reception-label', cfg.reception.label);
  setText('ev-reception-date', cfg.reception.dateDisplay);
  setText('ev-reception-venue', cfg.reception.venueName);

  document.getElementById('timer-wedding').dataset.target = cfg.wedding.dateISO;
  document.getElementById('timer-reception').dataset.target = cfg.reception.dateISO;

  const mapsEmbed = document.querySelector('.venue-map iframe');
  if (mapsEmbed) mapsEmbed.src = `https://www.google.com/maps?q=${encodeURIComponent(cfg.primaryVenueMapsQuery)}&output=embed`;
  const dirLink = document.getElementById('directions-link');
  if (dirLink) dirLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.primaryVenueMapsQuery)}`;

  const rsvpLink = document.querySelector('#rsvp a.btn-gold');
  if (rsvpLink) rsvpLink.href = `https://wa.me/${cfg.whatsapp.number}?text=${encodeURIComponent(cfg.whatsapp.rsvpMessage)}`;

  /* ================= TEMPLE DOOR OPENING ANIMATION ================= */
  const tl = gsap.timeline({ delay: 0.3 });
  tl.to('.gopuram', { y: -30, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
    .from('.gopuram', { y: -60, opacity: 0, duration: 0.8 }, 0)
    .to('.door-left', { xPercent: -100, duration: 1.4, ease: 'power3.inOut' }, 1.1)
    .to('.door-right', { xPercent: 100, duration: 1.4, ease: 'power3.inOut' }, 1.1)
    .to('.preloader-caption', { opacity: 0, duration: 0.4 }, 1.1)
    .to('#temple-doors', {
      opacity: 0, duration: 0.5, onComplete: () => {
        document.getElementById('temple-doors').style.display = 'none';
        document.body.classList.add('doors-open');
      }
    }, 2.3)
    .from('.hero-content > *', { y: 30, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power2.out' }, 2.2)
    .from('.vilakku-left', { x: -80, opacity: 0, duration: 1 }, 2.3)
    .from('.vilakku-right', { x: 80, opacity: 0, duration: 1 }, 2.3);

  /* ================= FALLING PETALS ================= */
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const PETAL_COUNT = window.innerWidth < 700 ? 18 : 32;
  const colors = ['#FFF8E7', '#FFE3EC', '#FFC1D6', '#FFD86B'];
  const petals = Array.from({ length: PETAL_COUNT }, () => makePetal());

  function makePetal() {
    return {
      x: Math.random() * W,
      y: Math.random() * -H,
      size: 6 + Math.random() * 8,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: Math.sin(Math.random() * Math.PI),
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      sway: Math.random() * 2 * Math.PI,
      swaySpeed: 0.01 + Math.random() * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size, -p.size, p.size, p.size, 0, p.size);
    ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size, 0, -p.size);
    ctx.fill();
    ctx.restore();
  }

  let animating = true;
  function animatePetals() {
    if (!animating) return;
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => {
      p.sway += p.swaySpeed;
      p.y += p.speedY;
      p.x += Math.sin(p.sway) * 0.6;
      p.rot += p.rotSpeed;
      if (p.y > H + 20) { Object.assign(p, makePetal(), { y: -20 }); }
      drawPetal(p);
    });
    requestAnimationFrame(animatePetals);
  }
  animatePetals();
  document.addEventListener('visibilitychange', () => {
    animating = !document.hidden;
    if (animating) animatePetals();
  });

  /* ================= SOUND TOGGLE ================= */
  const bgm = document.getElementById('bgm');
  const soundBtn = document.getElementById('sound-toggle');
  const iconMuted = document.getElementById('icon-muted');
  const iconUnmuted = document.getElementById('icon-unmuted');
  let playing = false;

  soundBtn.addEventListener('click', () => {
    if (!bgm.src || bgm.readyState === 0) bgm.load();
    if (playing) {
      bgm.pause();
      playing = false;
    } else {
      bgm.play().catch(() => { /* file missing or blocked — silently ignore */ });
      playing = true;
    }
    iconMuted.style.display = playing ? 'none' : 'block';
    iconUnmuted.style.display = playing ? 'block' : 'none';
  });

  /* ================= COUNTDOWN TIMERS ================= */
  function startTimer(el) {
    const target = new Date(el.dataset.target).getTime();
    const nums = el.querySelectorAll('.num');
    function tick() {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const vals = [d, h, m, s];
      nums.forEach((n, i) => { n.textContent = String(vals[i]).padStart(2, '0'); });
    }
    tick();
    setInterval(tick, 1000);
  }
  document.querySelectorAll('.timer').forEach(startTimer);

  /* ================= GALLERY ================= */
  const galleryGrid = document.getElementById('gallery-grid');
  cfg.gallery.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', String((i % 3) * 100));
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Wedding moment ' + (i + 1);
    img.loading = 'lazy';
    img.onerror = () => {
      img.remove();
      const fb = document.createElement('div');
      fb.className = 'fallback';
      fb.textContent = 'Add ' + src.split('/').pop();
      item.appendChild(fb);
    };
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(src));
    galleryGrid.appendChild(item);
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
  }
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

  /* ================= ADD TO CALENDAR ================= */
  function pad(n) { return String(n).padStart(2, '0'); }
  function toICSDate(iso) {
    const d = new Date(iso);
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
  }
  function buildEvent(key) {
    const e = cfg[key];
    const start = new Date(e.dateISO);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // 3hr default
    return { title: `${cfg.coupleNames} — ${e.label}`, start, end, venue: e.venueName, iso: e.dateISO };
  }
  function googleCalUrl(ev) {
    const s = toICSDate(ev.start.toISOString());
    const en = toICSDate(ev.end.toISOString());
    const params = new URLSearchParams({
      action: 'TEMPLATE', text: ev.title, dates: `${s}/${en}`,
      details: `Join us for the ${ev.title}`, location: ev.venue
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }
  function downloadICS(ev) {
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invite//EN', 'BEGIN:VEVENT',
      `UID:${Date.now()}@wedding`,
      `DTSTAMP:${toICSDate(new Date().toISOString())}`,
      `DTSTART:${toICSDate(ev.start.toISOString())}`,
      `DTEND:${toICSDate(ev.end.toISOString())}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.venue}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = ev.title.replace(/\s+/g, '_') + '.ics';
    link.click();
  }

  document.querySelectorAll('.add-to-cal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.cal-menu').forEach(m => m.remove());
      const ev = buildEvent(btn.dataset.event);
      const menu = document.createElement('div');
      menu.className = 'cal-menu';
      const rect = btn.getBoundingClientRect();
      menu.style.top = (window.scrollY + rect.bottom + 8) + 'px';
      menu.style.left = (window.scrollX + rect.left) + 'px';
      const gLink = document.createElement('a');
      gLink.href = googleCalUrl(ev); gLink.target = '_blank'; gLink.rel = 'noopener';
      gLink.textContent = 'Google Calendar';
      const iBtn = document.createElement('button');
      iBtn.textContent = 'Download .ics (Apple/Outlook)';
      iBtn.addEventListener('click', () => { downloadICS(ev); menu.remove(); });
      menu.appendChild(gLink); menu.appendChild(iBtn);
      document.body.appendChild(menu);
      setTimeout(() => {
        document.addEventListener('click', function closeMenu(ev2) {
          if (!menu.contains(ev2.target)) { menu.remove(); document.removeEventListener('click', closeMenu); }
        });
      }, 10);
      e.stopPropagation();
    });
  });

  /* ================= QR CODE ================= */
  if (window.QRCode) {
    new QRCode(document.getElementById('qrcode'), {
      text: cfg.siteUrl,
      width: 150, height: 150,
      colorDark: '#5C0511',
      colorLight: '#ffffff'
    });
  }

  /* ================= WHATSAPP SHARE ================= */
  document.getElementById('whatsapp-share').addEventListener('click', () => {
    const msg = `${cfg.whatsapp.shareMessage} ${cfg.siteUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  /* ================= AOS + SCROLL / PARALLAX ================= */
  AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.parallax-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  /* ================= DOT NAV ACTIVE STATE ================= */
  const sections = document.querySelectorAll('section[id], header[id]');
  const dots = document.querySelectorAll('#dot-nav .dot');
  function updateDots() {
    let current = sections[0].id;
    sections.forEach(s => { if (window.scrollY + window.innerHeight * 0.5 >= s.offsetTop) current = s.id; });
    dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', updateDots);
  updateDots();

  /* ================= PWA SERVICE WORKER ================= */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
});
