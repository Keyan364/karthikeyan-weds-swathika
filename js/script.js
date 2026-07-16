document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. SAFE DATA DEFAULTS & GLOBAL CONFIG CHECKS
  // ==========================================================================
  const weddingConfig = (window.weddingConfig) ? window.weddingConfig : {
    coupleNames: "Meera & Arjun",
    wedding: { dateISO: "2026-12-14T07:00:00+05:30", venueName: "Sri Meenakshi Kalyana Mandapam, Chennai" },
    reception: { dateISO: "2026-12-14T19:00:00+05:30", venueName: "The Grand Ballroom, Taj Coromandel, Chennai" },
    whatsapp: { number: "919999999999" },
    siteUrl: window.location.href,
    gallery: ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg"]
  };

  // ==========================================================================
  // 2. KICKSTART & AUDIO HANDLING VIA TEMPLE DOOR INTERACTION
  // ==========================================================================
  const templeDoors = document.getElementById('temple-doors');
  const soundToggle = document.getElementById('sound-toggle');
  const bgm = document.getElementById('bgm');
  const mutedIcon = document.getElementById('icon-muted');
  const unmutedIcon = document.getElementById('icon-unmuted');

  const openCelebration = () => {
    if (!templeDoors.classList.contains('open-doors')) {
      templeDoors.classList.add('open-doors');
      
      // Initialize layout integrations via AOS inside the safe timeline window
      if (window.AOS) {
        window.AOS.init({ duration: 1000, once: true, offset: 100 });
      }

      // Try autoplaying systemic background score safely inside click scopes
      bgm.play().then(() => {
        mutedIcon.style.display = 'none';
        unmutedIcon.style.display = 'block';
      }).catch(err => console.warn("Audio engine awaiting explicit unmuting action:", err));
    }
  };

  // Triggers entry when clicking anywhere on the overlay/preloader frame
  templeDoors.addEventListener('click', openCelebration);

  soundToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Avoid refiring window configurations
    if (bgm.paused) {
      bgm.play();
      mutedIcon.style.display = 'none';
      unmutedIcon.style.display = 'block';
    } else {
      bgm.pause();
      mutedIcon.style.display = 'block';
      unmutedIcon.style.display = 'none';
    }
  });

  // ==========================================================================
  // 3. JASMINE & ROSE FALLING PETALS CANVAS LOGIC
  // ==========================================================================
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let petalPool = [];
  const maxPetals = 45;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class FallingPetal {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // Stagger deployment coordinates initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1 - 0.5;
      // 60/40 Split between Pink Rose Petals and Off-White Elegant Jasmine Blooms
      this.isRose = Math.random() > 0.4;
      this.color = this.isRose ? 'rgba(255, 154, 162, 0.75)' : 'rgba(255, 255, 240, 0.85)';
      this.swingWeight = Math.random() * 0.02 + 0.01;
      this.swingCounter = Math.random() * 100;
      this.rotation = Math.random() * 360;
      this.spinSpeed = Math.random() * 2 - 1;
    }

    update() {
      this.y += this.speedY;
      this.swingCounter += this.swingWeight;
      this.x += this.speedX + Math.sin(this.swingCounter) * 0.4;
      this.rotation += this.spinSpeed;

      if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      
      if (this.isRose) {
        // Classic elliptical drop curve for Rose petal models
        ctx.ellipse(0, 0, this.size, this.size * 0.75, 0, 0, 2 * Math.PI);
      } else {
        // Star-elongated slender loop path for delicate Jasmine petals
        ctx.ellipse(0, 0, this.size * 1.2, this.size * 0.4, 0, 0, 2 * Math.PI);
      }
      
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < maxPetals; i++) {
    petalPool.push(new FallingPetal());
  }

  const runPetalEngine = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalPool.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(runPetalEngine);
  };
  runPetalEngine();

  // ==========================================================================
  // 4. LIVE MULTI-EVENT COUNTDOWN SYSTEM
  // ==========================================================================
  const manageCountdown = (elementId, targetISO) => {
    const timerContainer = document.getElementById(elementId);
    if (!timerContainer) return;

    const targetTime = new Date(targetISO).getTime();
    const dayNode = timerContainer.querySelectorAll('.num')[0];
    const hrNode = timerContainer.querySelectorAll('.num')[1];
    const minNode = timerContainer.querySelectorAll('.num')[2];
    const secNode = timerContainer.querySelectorAll('.num')[3];

    const recalculate = () => {
      const now = new Date().getTime();
      const delta = targetTime - now;

      if (delta <= 0) {
        timerContainer.innerHTML = `<div class="gold-foil" style="grid-column: span 4; font-size:1.2rem; padding:10px;">Event Has Begun</div>`;
        return;
      }

      const d = Math.floor(delta / (1000 * 60 * 60 * 24));
      const h = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((delta % (1000 * 60)) / 1000);

      dayNode.textContent = String(d).padStart(2, '0');
      hrNode.textContent = String(h).padStart(2, '0');
      minNode.textContent = String(m).padStart(2, '0');
      secNode.textContent = String(s).padStart(2, '0');
    };

    recalculate();
    setInterval(recalculate, 1000);
  };

  manageCountdown('timer-wedding', weddingConfig.wedding.dateISO);
  manageCountdown('timer-reception', weddingConfig.reception.dateISO);

  // ==========================================================================
  // 5. RESPONSIVE PARALLAX & DOT SCROLL SYNCING
  // ==========================================================================
  const parallaxBg = document.querySelector('.parallax-bg');
  const trackingSections = document.querySelectorAll('header, section');
  const trackingDots = document.querySelectorAll('#dot-nav .dot');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax background offset calculations
    if (parallaxBg) {
      const parentSection = parallaxBg.parentElement;
      const offsetTop = parentSection.offsetTop;
      const viewHeight = window.innerHeight;
      
      if (scrolled + viewHeight >= offsetTop && scrolled <= offsetTop + parentSection.offsetHeight) {
        const translateValue = (scrolled - offsetTop) * 0.3; // Parallax dynamic ratio scaling
        parallaxBg.style.transform = `translate3d(0, ${translateValue}px, 0)`;
      }
    }

    // Dynamic Navigation Dot Active Highlighter Sync
    let activeId = "";
    trackingSections.forEach(sec => {
      const top = sec.offsetTop - 300;
      if (scrolled >= top) {
        activeId = sec.getAttribute('id');
      }
    });

    trackingDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('href') === `#${activeId}`) {
        dot.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 6. PHOTO GALLERY GENERATION & POP-UP LIGHTBOX
  // ==========================================================================
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryGrid && weddingConfig.gallery.length > 0) {
    weddingConfig.gallery.forEach(fileName => {
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';
      wrapper.setAttribute('data-aos', 'fade-up');
      
      const imageNode = document.createElement('img');
      imageNode.src = `assets/photos/${fileName}`;
      imageNode.alt = "Wedding Celebration Moment";
      
      // Graceful fallback display logic if target local source file path is broken
      imageNode.onerror = () => {
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.background = 'rgba(255,255,255,0.05)';
        wrapper.innerHTML = `<span style="font-size:0.8rem; color:var(--text-light); opacity:0.6;">${fileName}</span>`;
      };

      wrapper.appendChild(imageNode);
      galleryGrid.appendChild(wrapper);

      wrapper.addEventListener('click', () => {
        if(imageNode.src) {
          lightboxImg.src = imageNode.src;
          lightbox.classList.add('active');
        }
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // ==========================================================================
  // 7. CALENDAR SCHEDULING INTERFACES (.ICS ENGINE)
  // ==========================================================================
  const createICSFile = (title, startISO, location) => {
    const formatDate = (isoStr) => {
      const d = new Date(isoStr);
      return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const startTime = formatDate(startISO);
    // Automatically buffer session block length duration by +3 hours
    const endTime = formatDate(new Date(new Date(startISO).getTime() + (3 * 60 * 60 * 1000)).toISOString());

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      `LOCATION:${location}`,
      "DESCRIPTION:We look forward to having you bless us on our special day!",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title.toLowerCase().replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  document.querySelectorAll('.add-to-cal').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-event');
      if (type === 'wedding') {
        createICSFile(`${weddingConfig.coupleNames} - Muhurtham`, weddingConfig.wedding.dateISO, weddingConfig.wedding.venueName);
      } else if (type === 'reception') {
        createICSFile(`${weddingConfig.coupleNames} - Wedding Reception`, weddingConfig.reception.dateISO, weddingConfig.reception.venueName);
      }
    });
  });

  // ==========================================================================
  // 8. AUTOMATED SYSTEM QR CODE & WHATSAPP SOCIAL INLINE GENERATOR
  // ==========================================================================
  const qrContainer = document.getElementById('qrcode');
  if (qrContainer && window.QRCode) {
    new QRCode(qrContainer, {
      text: weddingConfig.siteUrl,
      width: 140,
      height: 140,
      colorDark: "#3D0A11",
      colorLight: "#ffffff"
    });
  }

  const whatsappBtn = document.getElementById('whatsapp-share');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const textMessage = encodeURIComponent(`You are cordially invited to celebrate the wedding of ${weddingConfig.coupleNames}! Open our digital invitation here: ${weddingConfig.siteUrl}`);
      window.open(`https://api.whatsapp.com/send?text=${textMessage}`, '_blank');
    });
  }
});
