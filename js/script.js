document.addEventListener('DOMContentLoaded', () => {
  
  // Safe Fallback Configurations
  const config = (window.weddingConfig) ? window.weddingConfig : {
    coupleNames: "Meera & Arjun",
    wedding: { dateISO: "2026-12-14T07:00:00+05:30", venueName: "Sri Meenakshi Kalyana Mandapam, Chennai" },
    reception: { dateISO: "2026-12-14T19:00:00+05:30", venueName: "The Grand Ballroom, Taj Coromandel, Chennai" },
    whatsapp: { number: "919999999999" },
    siteUrl: window.location.href,
    gallery: ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg"]
  };

  const templeDoors = document.getElementById('temple-doors');
  const soundToggle = document.getElementById('sound-toggle');
  const bgm = document.getElementById('bgm');
  const mutedIcon = document.getElementById('icon-muted');
  const unmutedIcon = document.getElementById('icon-unmuted');

  // Set initial state of hero content for animation
  gsap.set("#hero .eyebrow, #hero-names, #hero .hero-sub, #hero .hero-date, #hero .scroll-cue", {
    opacity: 0,
    y: 40
  });

  // ==========================================================================
  // 1. CINEMATIC DOOR SPLIT & NAME REVEAL ANIMATION (GSAP)
  // ==========================================================================
  const openCelebration = () => {
    if (templeDoors.classList.contains('opened')) return;
    templeDoors.classList.add('opened');

    // Attempt to play music within user interaction scope
    bgm.play().then(() => {
      mutedIcon.style.display = 'none';
      unmutedIcon.style.display = 'block';
    }).catch(err => console.log("Audio awaiting activation:", err));

    // Master Entrance Timeline
    const tl = gsap.timeline();

    tl.to(".gopuram, .preloader-caption", {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(".door-left", {
      xPercent: -100,
      duration: 1.6,
      ease: "power3.inOut"
    }, "-=0.2")
    .to(".door-right", {
      xPercent: 100,
      duration: 1.6,
      ease: "power3.inOut"
    }, "-=1.6")
    .to(templeDoors, {
      opacity: 0,
      display: "none",
      duration: 0.5
    })
    // Grand Bride & Groom Reveal Sequence
    .to("#hero .eyebrow", {
      opacity: 0.8,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to("#hero-names", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.2)"
    }, "-=0.6")
    .to("#hero .hero-sub, #hero .hero-date", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.8")
    .to("#hero .scroll-cue", {
      opacity: 1,
      y: 0,
      duration: 0.5
    }, "-=0.2");

    if (window.AOS) {
      setTimeout(() => { window.AOS.init({ duration: 1000, once: true }); }, 1500);
    }
  };

  templeDoors.addEventListener('click', openCelebration);

  // Audio FAB
  soundToggle.addEventListener('click', (e) => {
    e.stopPropagation();
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
  // 2. ULTRA-REALISTIC 3D FLUTTERING PETALS (CANVAS)
  // ==========================================================================
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let petals = [];
  const petalCount = 35; // Balanced for high performance and visual elegance

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class PremiumPetal {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -40;
      this.size = Math.random() * 10 + 8;
      this.speedY = Math.random() * 1.0 + 0.6;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.isRose = Math.random() > 0.5;
      
      // Luxury Color Gradients (Cream Jasmine vs. Rich Rose Pink)
      this.colorGrad = this.isRose ? ['#FF9AA2', '#E85D75'] : ['#FFFFF0', '#F4E5A1'];
      
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1.5 - 0.75;
      this.flutter = Math.random() * 0.03 + 0.01;
      this.flutterPhase = Math.random() * 100;
      this.opacity = Math.random() * 0.3 + 0.6;
      
      // 3D fold simulation
      this.foldScale = Math.random() * 0.4 + 0.6;
    }

    update() {
      this.y += this.speedY;
      this.flutterPhase += this.flutter;
      this.x += this.speedX + Math.sin(this.flutterPhase) * 0.6;
      this.rotation += this.rotationSpeed;

      // Simulate folding/unfolding spin cycle
      this.foldScale = Math.sin(this.flutterPhase * 1.5) * 0.4 + 0.6;

      if (this.y > canvas.height + 40 || this.x < -40 || this.x > canvas.width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      ctx.scale(1, this.foldScale); // Generates a realistic 3D twisting look

      // Elegant gradient structure for depths
      let grad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size);
      grad.addColorStop(0, this.colorGrad[0]);
      grad.addColorStop(1, this.colorGrad[1]);

      ctx.fillStyle = grad;
      ctx.globalAlpha = this.opacity;
      
      ctx.beginPath();
      if (this.isRose) {
        // Heart-shaped/Curved Rose petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size, -this.size * 1.5, this.size/2, 0, this.size * 1.2);
        ctx.bezierCurveTo(this.size * 1.5, this.size/2, this.size, -this.size, 0, 0);
      } else {
        // Sleek Jasmine petal shape
        ctx.ellipse(0, 0, this.size * 1.3, this.size * 0.45, 0, 0, 2 * Math.PI);
      }
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) petals.push(new PremiumPetal());

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  };
  animate();

  // ==========================================================================
  // 3. SECURE COUNTDOWNS
  // ==========================================================================
  const makeCountdown = (elemId, isoDate) => {
    const container = document.getElementById(elemId);
    if (!container) return;

    const target = new Date(isoDate).getTime();
    const [days, hrs, mins, secs] = container.querySelectorAll('.num');

    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        container.innerHTML = `<div class="event-started gold-foil">Celebrations Have Begun!</div>`;
        return;
      }

      days.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      hrs.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      mins.textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      secs.textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  };

  makeCountdown('timer-wedding', config.wedding.dateISO);
  makeCountdown('timer-reception', config.reception.dateISO);

  // ==========================================================================
  // 4. PARALLAX EFFECT & NAV DOTS
  // ==========================================================================
  const parallaxBg = document.querySelector('.parallax-bg');
  const sections = document.querySelectorAll('header, section');
  const dots = document.querySelectorAll('#dot-nav .dot');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (parallaxBg) {
      const parent = parallaxBg.parentElement;
      const speed = parseFloat(parallaxBg.getAttribute('data-speed')) || 0.3;
      if (scrolled + window.innerHeight >= parent.offsetTop) {
        const yPos = (scrolled - parent.offsetTop) * speed;
        parallaxBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    }

    let currentSection = "";
    sections.forEach(sec => {
      if (scrolled >= (sec.offsetTop - 350)) {
        currentSection = sec.getAttribute('id');
      }
    });

    dots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('href') === `#${currentSection}`) {
        dot.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // 5. PREVENTING DUPLICATE QR CODE RENDER
  // ==========================================================================
  const qrBox = document.getElementById('qrcode');
  if (qrBox && window.QRCode) {
    qrBox.innerHTML = ''; // Safeguard: Clear out any pre-existing renders
    new QRCode(qrBox, {
      text: config.siteUrl,
      width: 150,
      height: 150,
      colorDark: "#3D0A11",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  const shareBtn = document.getElementById('whatsapp-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const msg = encodeURIComponent(`You are cordially invited to celebrate our wedding! Access our dynamic invitation here: ${config.siteUrl}`);
      window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
    });
  }
});
