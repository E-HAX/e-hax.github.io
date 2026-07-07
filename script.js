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
      const count = Math.min(80, Math.floor(window.innerWidth / 15));
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

  // Timeline items observer
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".timeline-item").forEach((el) => {
    timelineObserver.observe(el);
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
  // HERO 3D LOGO - DRAG TO ROTATE + AUTO SPIN
  // ==========================================
  const heroLogo = document.getElementById("heroLogo3D");
  if (heroLogo) {
    const heroSection = document.getElementById("hero");
    let isDragging = false;
    let startX = 0, startY = 0;
    let rotX = 0, rotY = 0;
    let currentRotX = 0, currentRotY = 0;
    let autoRotX = 0, autoRotY = 0;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      if (!isDragging) {
        autoRotX += 0.15;
        autoRotY += 0.25;
      }

      const targetRotX = rotX + autoRotX;
      const targetRotY = rotY + autoRotY;

      currentRotX = lerp(currentRotX, targetRotX, 0.08);
      currentRotY = lerp(currentRotY, targetRotY, 0.08);

      heroLogo.style.transform = `
        rotateX(${currentRotX}deg)
        rotateY(${currentRotY}deg)
      `;

      requestAnimationFrame(animate);
    };

    animate();

    heroSection.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      heroSection.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      rotY += dx * 0.5;
      rotX -= dy * 0.5;
      startX = e.clientX;
      startY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
      heroSection.style.cursor = "grab";
    });
  }

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
  // TYPING EFFECT
  // ==========================================
  class TypingEffect {
    constructor(element) {
      this.element = element;
      this.text = element.textContent;
      this.element.textContent = "";
      this.index = 0;
      this.type();
    }

    type() {
      if (this.index < this.text.length) {
        this.element.textContent += this.text.charAt(this.index);
        this.index++;
        setTimeout(() => this.type(), 30 + Math.random() * 50);
      }
    }
  }

  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            new TypingEffect(typingElement);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(typingElement);
  }

  // ==========================================
  // PARALLAX ON SCROLL
  // ==========================================
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll(".floating-shape");

        shapes.forEach((shape, i) => {
          const speed = (i + 1) * 0.02;
          shape.style.transform = `translateY(${scrollY * speed}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  // ==========================================
  // CURSOR GLOW EFFECT (DESKTOP ONLY)
  // ==========================================
  if (window.matchMedia("(min-width: 768px)").matches) {
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
