// © 2026 Kinane. All Rights Reserved.
// Scroll animation: watches every ".reveal" element,
// adds "is-visible" once it enters the screen (staggered slightly)
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numberOfParticles = 70;

class Particle {
  constructor() {
    this.x = Math.random() *canvas.width;
    this.y = Math.random() *canvas.height;
    this.size = Math.random()* 2+1;
    this.speedX = Math.random()* 1-0.5;
    this.speedY = Math.random()* 1-0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Bounce when reaching screen edges
    if (this.x > canvas.width || this.x < 0) {
      this.speedX*= -1;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY*= -1;
    }
  }
  draw() {
    ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a=0; a<particles.length; a++) {
    for (let b=a+1; b <particles.length; b++) {

      const dx= particles[a].x-particles[b].x;
      const dy= particles[a].y-particles[b].y;
      const distance = Math.sqrt(dx*dx+dy*dy);
      if (distance < 120) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(
          particles[a].x,
          particles[a].y
        );
        ctx.lineTo(
          particles[b].x,
          particles[b].y
        );
        ctx.stroke();
      }
    }
  }
}

function animate() {
  // Clear the previous frame
  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animate);
}

createParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});