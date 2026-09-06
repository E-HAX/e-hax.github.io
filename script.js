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

  const setMenu = (open) => {
    if (!navbar || !menuToggle) return;
    navbar.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    const icon = menuToggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = open ? "close" : "menu";
  };

  const setNavbarState = () => {
    if (!navbar) return;
    const y = window.scrollY;

    // Past the hero the bar gets its blurred background. On desktop it also
    // slides in here; on phones CSS keeps it on screen from the start.
    navbar.classList.toggle("visible", y > 80);
    navbar.classList.toggle("scrolled", y > 80);
  };

  setNavbarState();
  window.addEventListener("scroll", setNavbarState, { passive: true });

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenu(!navbar.classList.contains("menu-open"));
    });

    // Tapping outside the bar, or pressing Escape, closes the menu.
    document.addEventListener("click", (e) => {
      if (navbar.classList.contains("menu-open") && !navbar.contains(e.target)) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navbar.classList.contains("menu-open")) {
        setMenu(false);
        menuToggle.focus();
      }
    });
  }

  if (mobileMenu && navbar && menuToggle) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
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

  // Pointer parallax for the server rack in the About section
  class PointerParallax {
    constructor(el) {
      this.el = el;
      this.tx = 0; this.ty = 0;
      this.mx = 0; this.my = 0;
      this.raf = 0;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        this.tx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
        this.ty = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
        this.kick();
      });
      el.addEventListener("mouseleave", () => {
        this.tx = 0;
        this.ty = 0;
        this.kick();
      });
    }

    kick() {
      if (!this.raf) this.raf = requestAnimationFrame(() => this.step());
    }

    step() {
      this.mx += (this.tx - this.mx) * 0.08;
      this.my += (this.ty - this.my) * 0.08;
      this.el.style.setProperty("--mx", this.mx.toFixed(3));
      this.el.style.setProperty("--my", this.my.toFixed(3));
      const settled = Math.abs(this.tx - this.mx) < 0.002 && Math.abs(this.ty - this.my) < 0.002;
      this.raf = settled ? 0 : requestAnimationFrame(() => this.step());
    }
  }

  const rackScene = document.getElementById("rackScene");
  if (rackScene) new PointerParallax(rackScene);

  // Rack drawers: click (or Enter / Space) pulls a blade out or pushes it back
  document.querySelectorAll("#rackScene .unit").forEach((blade) => {
    const toggle = () => {
      const open = blade.classList.toggle("is-out");
      blade.setAttribute("aria-pressed", String(open));
    };
    blade.addEventListener("click", toggle);
    blade.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

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

  // ==========================================
  // RING CAROUSEL DRAG INTERACTION
  // ==========================================
  const ring = document.querySelector(".ring");
  const ringStage = document.querySelector(".ring-stage");
  if (ring && ringStage) {
    let isDragging = false;
    let startX = 0;
    let currentY = 0;
    let targetY = 0;
    let isHovered = false;

    ring.style.animation = "none";
    ringStage.style.cursor = "grab";

    ringStage.addEventListener("mouseenter", () => isHovered = true);
    ringStage.addEventListener("mouseleave", () => {
      isHovered = false;
      // if we want to stop drag when leaving stage, we could, but window listeners handle it
    });

    const updateRotation = () => {
      if (!isDragging && !isHovered) {
        targetY += 0.125;
      }
      currentY += (targetY - currentY) * 0.1;
      ring.style.transform = `rotateX(-10deg) rotateY(${currentY}deg)`;
      requestAnimationFrame(updateRotation);
    };
    
    updateRotation();

    const handleDown = (e) => {
      isDragging = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      ringStage.style.cursor = "grabbing";
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      const deltaX = x - startX;
      targetY += deltaX * 0.15;
      startX = x;
    };

    const handleUp = () => {
      isDragging = false;
      ringStage.style.cursor = "grab";
    };

    ringStage.addEventListener("dragstart", e => e.preventDefault());
    
    ringStage.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    ringStage.addEventListener("touchstart", handleDown, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);
  }

  // ==========================================
  // FOOTER SOC ROOM - VIDEO WALL ANALYTICS
  // ==========================================
  const socTiles = document.querySelectorAll(".soc-tile");
  const socEls = {
    name: document.getElementById("socFeedName"),
    code: document.getElementById("socFeedCode"),
    log: document.getElementById("socLog"),
    line: document.getElementById("socLine"),
    area: document.getElementById("socArea"),
    headDot: document.getElementById("socHeadDot"),
    events: document.getElementById("socKpiEvents"),
    sev: document.getElementById("socKpiSev"),
    blocked: document.getElementById("socKpiBlocked"),
    gaugeArc: document.getElementById("socGaugeArc"),
    gaugeValue: document.getElementById("socGaugeValue"),
    sources: document.getElementById("socSources"),
    ticker: document.getElementById("socTicker"),
  };
  const socDesks = Array.from(document.querySelectorAll(".soc-desk"));

  if (socTiles.length && socEls.name && socEls.line) {
    // Illustrative telemetry for the video wall, one profile per domain.
    const SOC_FEEDS = [
      {
        name: "Web Exploitation",
        events: 1284, sev: 6.4, blocked: 92, risk: 6.8, seed: 11, spike: 0.75,
        sources: [["edge-01", 74], ["waf-eu", 58], ["api-gw", 41], ["cdn-in", 22]],
        lines: ["payload: ' OR 1=1 -- on /login", "waf rule 942100 matched x37"],
      },
      {
        name: "Binary Exploitation",
        events: 342, sev: 8.1, blocked: 61, risk: 8.4, seed: 29, spike: 0.35,
        sources: [["pwn-jail", 88], ["ctf-vm", 45], ["fuzz-01", 30], ["sbx-04", 12]],
        lines: ["heap chunk 0x5651a0 overflow", "rop chain: pop rdi ; ret"],
      },
      {
        name: "Reverse Engineering",
        events: 168, sev: 5.2, blocked: 44, risk: 5.1, seed: 47, spike: 0.2,
        sources: [["sample-q", 66], ["unpack", 52], ["emul-02", 28], ["yara", 19]],
        lines: ["unpacking upx section .text", "anti-debug: ptrace bypassed"],
      },
      {
        name: "Cryptography",
        events: 96, sev: 4.6, blocked: 38, risk: 4.2, seed: 63, spike: 0.15,
        sources: [["tls-scan", 71], ["keystore", 40], ["rng-mon", 24], ["pki", 15]],
        lines: ["aes-ecb block repeat detected", "nonce reuse in chacha20 stream"],
      },
      {
        name: "Cloud Infrastructure",
        events: 2210, sev: 7.3, blocked: 84, risk: 7.6, seed: 83, spike: 0.6,
        sources: [["k8s-prod", 91], ["iam", 63], ["s3-audit", 47], ["vpc-flow", 26]],
        lines: ["imds v1 reachable from pod", "s3 bucket: public list acl"],
      },
      {
        name: "AI Security",
        events: 508, sev: 6.9, blocked: 57, risk: 7.1, seed: 101, spike: 0.5,
        sources: [["llm-gw", 79], ["rag-idx", 54], ["agent-1", 36], ["evals", 21]],
        lines: ["prompt injection in tool output", "guardrail bypass: role swap"],
      },
    ];

    const W = 620;
    const H = 78;
    const N = 48;

    // Deterministic per-feed series, so a feed always draws the same shape.
    const series = (feed) => {
      let s = feed.seed;
      const rand = () => {
        s = (s * 1103515245 + 12345) % 2147483648;
        return s / 2147483648;
      };
      const pts = [];
      for (let i = 0; i < N; i++) {
        const t = i / (N - 1);
        const base = 0.42 + Math.sin(t * Math.PI * 2.4 + feed.seed) * 0.16;
        const burst = Math.exp(-Math.pow((t - 0.68) * 5.2, 2)) * feed.spike;
        pts.push(Math.max(0.05, Math.min(0.97, base + burst + (rand() - 0.5) * 0.13)));
      }
      return pts;
    };

    const paths = (pts) => {
      const step = W / (N - 1);
      const xy = pts.map((v, i) => [i * step, H - v * (H - 6) - 3]);
      const d = xy.map(([x, y], i) => (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)).join(" ");
      return { line: d, area: d + " L" + W + " " + H + " L0 " + H + " Z", last: xy[xy.length - 1] };
    };

    // Count a readout up to its new value so switching feeds reads as live data.
    const countTo = (el, target, decimals, suffix) => {
      if (!el) return;
      const from = parseFloat(el.textContent) || 0;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 600, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (from + (target - from) * eased).toFixed(decimals) + (suffix || "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const renderFeed = (index) => {
      const feed = SOC_FEEDS[index];
      if (!feed) return;

      socEls.name.textContent = feed.name;
      socEls.code.textContent = "FEED-" + String(index + 1).padStart(2, "0");

      const p = paths(series(feed));
      socEls.line.setAttribute("d", p.line);
      if (socEls.area) socEls.area.setAttribute("d", p.area);
      if (socEls.headDot) {
        socEls.headDot.setAttribute("cx", p.last[0].toFixed(1));
        socEls.headDot.setAttribute("cy", p.last[1].toFixed(1));
      }

      countTo(socEls.events, feed.events, 0);
      countTo(socEls.sev, feed.sev, 1);
      countTo(socEls.blocked, feed.blocked, 0, "%");
      countTo(socEls.gaugeValue, feed.risk, 1);
      if (socEls.gaugeArc) {
        const circumference = 239;
        socEls.gaugeArc.style.strokeDashoffset = String(circumference * (1 - feed.risk / 10));
      }

      if (socEls.sources) {
        socEls.sources.innerHTML = "";
        feed.sources.forEach(([label, pct]) => {
          const row = document.createElement("div");
          row.className = "soc-source";
          const name = document.createElement("span");
          name.textContent = label;
          const track = document.createElement("span");
          track.className = "soc-source-track";
          const fill = document.createElement("span");
          fill.className = "soc-source-fill";
          fill.style.width = pct + "%";
          track.appendChild(fill);
          const value = document.createElement("span");
          value.className = "soc-source-value";
          value.textContent = pct;
          row.append(name, track, value);
          socEls.sources.appendChild(row);
        });
      }

      if (socEls.log) {
        socEls.log.innerHTML = "";
        feed.lines.forEach((line) => {
          const li = document.createElement("li");
          const marker = document.createElement("b");
          marker.textContent = "> ";
          li.appendChild(marker);
          li.appendChild(document.createTextNode(line));
          socEls.log.appendChild(li);
        });
      }

      socTiles.forEach((tile) => {
        const active = Number(tile.dataset.feed) === index;
        tile.classList.toggle("is-active", active);
        tile.setAttribute("aria-pressed", String(active));
      });

      socDesks.forEach((desk) => {
        desk.classList.toggle("is-active", Number(desk.dataset.feed) === index);
      });

      if (socEls.ticker) {
        socEls.ticker.textContent = SOC_FEEDS.map((f, i) =>
          "FEED-" + String(i + 1).padStart(2, "0") + " " + f.name + " · " + f.events + " ev/min · risk " + f.risk.toFixed(1)
        ).join("   //   ");
      }
    };

    socDesks.forEach((desk) => {
      desk.addEventListener("click", () => renderFeed(Number(desk.dataset.feed)));
    });

    socTiles.forEach((tile) => {
      tile.addEventListener("click", () => renderFeed(Number(tile.dataset.feed)));
      tile.addEventListener("mouseenter", () => renderFeed(Number(tile.dataset.feed)));
    });

    renderFeed(0);
  }

  // ==========================================
  // COUNCIL RIG - MEMBERS AS COMPONENTS
  // ==========================================
  const rig = document.getElementById("rig");

  if (rig) {
    const CLASSES = { lights: "is-lit", fans: "is-spinning" };

    rig.querySelectorAll("[data-rig]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cls = CLASSES[btn.dataset.rig];
        if (!cls) return;
        const on = rig.classList.toggle(cls);
        btn.classList.toggle("is-on", on);
        btn.setAttribute("aria-pressed", String(on));
      });
    });

    // The case turns to follow the cursor across the section.
    const pc = rig.querySelector(".pc");
    const zone = rig.closest(".section-container") || rig;

    if (pc && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let tx = 0, ty = 0, mx = 0, my = 0, raf = 0;

      const step = () => {
        mx += (tx - mx) * 0.08;
        my += (ty - my) * 0.08;
        pc.style.setProperty("--ry", (38 + mx * 18).toFixed(2) + "deg");
        pc.style.setProperty("--rx", (8 - my * 8).toFixed(2) + "deg");
        raf = Math.abs(tx - mx) < 0.002 && Math.abs(ty - my) < 0.002
          ? 0
          : requestAnimationFrame(step);
      };

      const kick = () => {
        if (!raf) raf = requestAnimationFrame(step);
      };

      zone.addEventListener("mousemove", (e) => {
        const r = zone.getBoundingClientRect();
        tx = ((e.clientX - r.left) / Math.max(r.width, 1)) * 2 - 1;
        ty = ((e.clientY - r.top) / Math.max(r.height, 1)) * 2 - 1;
        kick();
      });

      zone.addEventListener("mouseleave", () => {
        tx = 0;
        ty = 0;
        kick();
      });
    }
  }

  // Each council member is a component in the case; the readout and the
  // parts list stay in sync with whichever one is hovered or focused.
  const councilRig = document.getElementById("councilRig");

  if (councilRig) {
    const MEMBERS = [
      { name: "Tushar", handle: "@benzo", role: "President", code: "CPU // SOCKET-0" },
      { name: "Mayank", handle: "@the_moon_guy", role: "Vice President", code: "MAINBOARD // X-01" },
      { name: "Arsh", handle: "@cha0s", role: "AI Head", code: "GPU // 3x FAN" },
      { name: "Arnabi", handle: "@g1ow", role: "Research Head", code: "MEMORY // 4x DIMM" },
      { name: "Mauray", handle: "@nrg", role: "PWN Head", code: "COOLER // 120MM" },
      { name: "Ayush", handle: "@cleverclaw", role: "Web Head", code: "NIC // 10GBE" },
      { name: "Tanish", handle: "@tanishfr", role: "DFIR Head", code: "STORAGE // NVME" },
      { name: "Stavya", handle: "@stapat", role: "Treasurer", code: "PSU // 850W" },
      { name: "Tarush Sonakya", handle: "@Anonimbus", role: "Advisor", code: "INTAKE // FAN-01" },
      { name: "Kartik Vats", handle: "@cyc", role: "Advisor", code: "INTAKE // FAN-02" },
      { name: "Anuj Rawat", handle: "", role: "Alumni", code: "CHASSIS // FRAME" },
    ];

    const parts = Array.from(councilRig.querySelectorAll(".part, .pc-name"));
    const rows = Array.from(councilRig.querySelectorAll(".bom-row"));
    const out = {
      code: document.getElementById("crCode"),
      name: document.getElementById("crName"),
      handle: document.getElementById("crHandle"),
      role: document.getElementById("crRole"),
    };

    const activate = (index) => {
      const m = MEMBERS[index];
      if (!m) return;
      if (out.code) out.code.textContent = m.code;
      if (out.name) out.name.textContent = m.name;
      if (out.handle) out.handle.textContent = m.handle;
      if (out.role) out.role.textContent = m.role;

      parts.forEach((p) => p.classList.toggle("is-active", Number(p.dataset.member) === index));
      const rigEl = document.getElementById("rig");
      if (rigEl) rigEl.classList.toggle("is-chassis", m.code.indexOf("CHASSIS") === 0);
      rows.forEach((r) => r.classList.toggle("is-active", Number(r.dataset.member) === index));
    };

    parts.concat(rows).forEach((el) => {
      const index = Number(el.dataset.member);
      el.addEventListener("mouseenter", () => activate(index));
      el.addEventListener("focus", () => activate(index));
      el.addEventListener("click", () => activate(index));
    });

    activate(0);
  }
});
