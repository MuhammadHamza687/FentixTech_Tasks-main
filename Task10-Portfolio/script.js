const revealElements = document.querySelectorAll(".reveal-up");
const navLinks = document.querySelectorAll(".nav-link");
const copyBtn = document.getElementById("copyBtn");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add("show");
        }, delay);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => observer.observe(element));

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 160;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) {
      return;
    }

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = "muhammadhamza9280@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      const oldLabel = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      copyBtn.disabled = true;

      setTimeout(() => {
        copyBtn.textContent = oldLabel;
        copyBtn.disabled = false;
      }, 1400);
    } catch {
      copyBtn.textContent = "Copy failed";
    }
  });
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const duration = 1300;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = target * progress;

    if (target % 1 !== 0) {
      counter.textContent = value.toFixed(2);
    } else if (counter.dataset.target === "400") {
      counter.textContent = `${Math.floor(value)}k+`;
    } else {
      counter.textContent = String(Math.floor(value));
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const networkCanvas = document.getElementById("nnBg");

if (networkCanvas) {
  const context = networkCanvas.getContext("2d");
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  let nodes = [];
  let width = 0;
  let height = 0;
  let rafId = 0;

  function createNode() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 1.3
    };
  }

  function resizeNetwork() {
    width = window.innerWidth;
    height = window.innerHeight;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    networkCanvas.width = Math.floor(width * devicePixelRatio);
    networkCanvas.height = Math.floor(height * devicePixelRatio);
    networkCanvas.style.width = `${width}px`;
    networkCanvas.style.height = `${height}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const density = mediaQuery.matches ? 30 : 54;
    nodes = Array.from({ length: density }, createNode);
  }

  function updateNodes() {
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < -30 || node.x > width + 30) {
        node.vx *= -1;
      }

      if (node.y < -30 || node.y > height + 30) {
        node.vy *= -1;
      }
    });
  }

  function drawNetwork() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];

      context.beginPath();
      context.fillStyle = "rgba(255, 210, 130, 0.68)";
      context.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      context.fill();

      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const maxDistance = mediaQuery.matches ? 95 : 130;

        if (distance < maxDistance) {
          const alpha = 1 - distance / maxDistance;
          context.beginPath();
          context.strokeStyle = `rgba(86, 194, 255, ${alpha * 0.26})`;
          context.lineWidth = 1;
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }
  }

  function animateNetwork() {
    updateNodes();
    drawNetwork();
    rafId = requestAnimationFrame(animateNetwork);
  }

  function setupNetwork() {
    cancelAnimationFrame(rafId);
    resizeNetwork();
    animateNetwork();
  }

  setupNetwork();
  window.addEventListener("resize", setupNetwork);
}
