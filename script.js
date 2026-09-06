/* ==========================================
   EHAX COLLECTIVE - INTERACTIVE SCRIPTS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // PARTICLE SYSTEM
  // ==========================================
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.particles = [];
      this.mouse = { x: 0, y: 0 };
      this.resize();
      this.init();
      this.animate();

      window.addEventListener("resize", () => this.resize());
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    init() {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 30 : Math.min(80, Math.floor(window.innerWidth / 15));
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;

        // Mouse interaction
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.005;
          p.y -= dy * 0.005;
        }

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        this.ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 120)})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  const canvas = document.getElementById("particleCanvas");
  if (canvas) new ParticleSystem(canvas);

  // ==========================================
  // NAVBAR
  // ==========================================
  const navbar = document.getElementById("mainNavbar");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const setNavbarState = () => {
    if (!navbar) return;
    const y = window.scrollY;

    if (y > 80) {
      navbar.classList.add("visible");
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.remove("visible");
      navbar.classList.remove("menu-open");

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
      }
    }
  };

  setNavbarState();
  window.addEventListener("scroll", setNavbarState, { passive: true });

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      const icon = menuToggle.querySelector(".material-symbols-outlined");
      if (icon) icon.textContent = isOpen ? "close" : "menu";
    });
  }

  if (mobileMenu && navbar && menuToggle) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
      });
    });
  }

  // ==========================================
  // SMOOTH SCROLLING
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        document
          .querySelectorAll(".nav-links a")
          .forEach((a) => a.classList.remove("active"));
        if (this.closest(".nav-links")) {
          this.classList.add("active");
        }
      }
    });
  });

  // Logo scroll to top
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ==========================================
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  // Reveal text observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-text").forEach((el) => {
    revealObserver.observe(el);
  });

  // Entry cards rise into view. Cards are visible by default and only hidden
  // once JS is running, so they never stay blank if this script fails.
  const entryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  document
    .querySelectorAll(".entry-card, .ach-card, .podium-card")
    .forEach((el) => {
      el.classList.add("rise-in");
      entryObserver.observe(el);
    });

  // Section nav highlight observer
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            document.querySelectorAll(".nav-links a").forEach((a) => {
              a.classList.remove("active");
              if (a.getAttribute("href") === `#${id}`) {
                a.classList.add("active");
              }
            });
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });

  // ==========================================
  // 3D TILT EFFECT
  // ==========================================
  class TiltEffect {
    constructor() {
      this.elements = document.querySelectorAll("[data-tilt]");
      this.init();
    }

    init() {
      this.elements.forEach((el) => {
        el.addEventListener("mousemove", (e) => this.handleMove(e, el));
        el.addEventListener("mouseleave", (e) => this.handleLeave(e, el));
      });
    }

    handleMove(e, el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = "transform 0.1s ease";
    }

    handleLeave(e, el) {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    }
  }

  new TiltEffect();

  // ==========================================
  // HERO - WIRE GLOBE + MOUSE PARALLAX
  // ==========================================
  class WireGlobe {
    constructor(canvas, hero) {
      this.canvas = canvas;
      this.hero = hero;
      this.ctx = canvas.getContext("2d");
      this.size = 640;
      this.count = 380;
      this.buckets = 7;
      this.points = [];
      this.edges = [];
      this.projected = [];
      this.tx = 0; this.ty = 0; // target parallax (-1..1)
      this.mx = 0; this.my = 0; // eased parallax
      this.raf = 0;
      this.t0 = null;
      this.visible = true;
      this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      this.setup();
      this.buildMesh();
      this.bind();
      this.start();
    }

    setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = this.size * dpr;
      this.canvas.height = this.size * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    buildMesh() {
      // Fibonacci sphere: evenly spread points, then connect near neighbours.
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < this.count; i++) {
        const y = 1 - (i / (this.count - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        this.points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
      }
      for (let a = 0; a < this.count; a++) {
        for (let b = a + 1; b < this.count; b++) {
          const dx = this.points[a][0] - this.points[b][0];
          const dy = this.points[a][1] - this.points[b][1];
          const dz = this.points[a][2] - this.points[b][2];
          if (dx * dx + dy * dy + dz * dz < 0.085) this.edges.push([a, b]);
        }
      }
      this.projected = new Array(this.count);
    }

    bind() {
      this.hero.addEventListener("mousemove", (e) => {
        const rect = this.hero.getBoundingClientRect();
        this.tx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
        this.ty = Math.min(((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1, 1);
      });
      this.hero.addEventListener("mouseleave", () => {
        this.tx = 0;
        this.ty = 0;
      });

      // Only animate while the hero is on screen.
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            this.visible = entry.isIntersecting;
            if (this.visible && !this.raf && !this.reduced) this.start();
          });
        }, { threshold: 0.05 });
        io.observe(this.hero);
      }
    }

    draw(t) {
      const ctx = this.ctx;
      const W = this.size, H = this.size;
      const N = this.count;

      this.mx += (this.tx - this.mx) * 0.06;
      this.my += (this.ty - this.my) * 0.06;
      this.hero.style.setProperty("--mx", this.mx.toFixed(3));
      this.hero.style.setProperty("--my", this.my.toFixed(3));

      const ay = t * 0.22 + this.mx * 0.7;
      const ax = -0.42 + this.my * 0.35;
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      const R = 236, F = 3.4, ox = W / 2, oy = H / 2;

      for (let i = 0; i < N; i++) {
        const p = this.points[i];
        const x1 = p[0] * cy + p[2] * sy;
        const z1 = -p[0] * sy + p[2] * cy;
        const y2 = p[1] * cx - z1 * sx;
        const z2 = p[1] * sx + z1 * cx;
        const s = F / (F - z2);
        this.projected[i] = [ox + x1 * R * s, oy + y2 * R * s, z2];
      }

      ctx.clearRect(0, 0, W, H);

      // Edges, batched by depth so alpha and width fade toward the back.
      for (let k = 0; k < this.buckets; k++) {
        const lo = -1 + (2 * k) / this.buckets;
        const hi = -1 + (2 * (k + 1)) / this.buckets;
        const depth = ((lo + hi) / 2 + 1) / 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.035 + depth * 0.30).toFixed(3)})`;
        ctx.lineWidth = 0.5 + depth * 0.7;
        ctx.beginPath();
        for (let e = 0; e < this.edges.length; e++) {
          const A = this.projected[this.edges[e][0]];
          const B = this.projected[this.edges[e][1]];
          const z = (A[2] + B[2]) / 2;
          if (z < lo || z >= hi) continue;
          ctx.moveTo(A[0], A[1]);
          ctx.lineTo(B[0], B[1]);
        }
        ctx.stroke();
      }

      // Points.
      for (let k = 0; k < this.buckets; k++) {
        const lo = -1 + (2 * k) / this.buckets;
        const hi = -1 + (2 * (k + 1)) / this.buckets;
        const depth = ((lo + hi) / 2 + 1) / 2;
        const size = 0.8 + depth * 1.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.12 + depth * 0.75).toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const q = this.projected[i];
          if (q[2] < lo || q[2] >= hi) continue;
          ctx.moveTo(q[0] + size, q[1]);
          ctx.arc(q[0], q[1], size, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    }

    start() {
      const frame = (now) => {
        if (this.t0 === null) this.t0 = now;
        this.draw((now - this.t0) / 1000);
        if (this.reduced || !this.visible) {
          this.raf = 0;
          return;
        }
        this.raf = requestAnimationFrame(frame);
      };
      this.raf = requestAnimationFrame(frame);
    }
  }

  const globeCanvas = document.getElementById("globeCanvas");
  const heroSection = document.getElementById("hero");
  if (globeCanvas && heroSection) new WireGlobe(globeCanvas, heroSection);

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  class CounterAnimation {
    constructor() {
      this.counters = document.querySelectorAll(".hero-stat");
      this.animated = false;
      this.init();
    }

    init() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.animated) {
              this.animated = true;
              this.counters.forEach((counter) => this.animateCounter(counter));
            }
          });
        },
        { threshold: 0.5 }
      );

      this.counters.forEach((counter) => observer.observe(counter));
    }

    animateCounter(counter) {
      const target = parseInt(counter.dataset.value);
      const numEl = counter.querySelector(".stat-num");
      const duration = 2000;
      const start = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(eased * target);

        numEl.textContent = current + "+";

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    }
  }

  new CounterAnimation();

  // ==========================================
  // TEXT TYPE EFFECT (React Bits)
  // ==========================================
  const textTypeEl = document.getElementById("textTypeContent");
  if (textTypeEl) {
    const texts = [
      "web exploitation",
      "binary exploitation",
      "reverse engineering",
      "cryptography",
      "hardware / iot",
      "cloud infrastructure",
      "mobile security",
      "offensive tooling",
      "ai security"
    ];

    const typingSpeed = 65;
    const deletingSpeed = 60;
    const pauseDuration = 500;

    let textIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentText = texts[textIdx];

      if (isDeleting) {
        charIdx--;
      } else {
        charIdx++;
      }

      const displayed = currentText.substring(0, charIdx);
      textTypeEl.textContent = displayed;

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIdx === currentText.length) {
        speed = pauseDuration;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % texts.length;
        speed = 350;
      }

      setTimeout(typeLoop, speed);
    }

    typeLoop();
  }

  // ==========================================
  // CURSOR GLOW EFFECT (DESKTOP ONLY)
  // ==========================================
  if (window.matchMedia("(min-width: 768px) and (hover: hover)").matches) {
    const cursorGlow = document.createElement("div");
    cursorGlow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }
});
