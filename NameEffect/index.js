const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

ctx.font = "30px Arial";
ctx.fillText("Ranjana", 40, 40);

const imageInfo = ctx.getImageData(0, 0, 200, 60);
console.log(imageInfo);

const mouse = {
  x: undefined,
  y: undefined,
  radius: 50
};

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(); // Reinitialize particles on resize
});

canvas.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = this.x; // Original x position
    this.baseY = this.y; // Original y position
    this.size = 2;
    this.density = (Math.random() * 30) + 1
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy)
    let maxDistance = mouse.radius;
    let forceDirectionX = dx / distance
    let forceDirectionY = dy / distance
    let force = (maxDistance - distance) / maxDistance
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    if (distance < maxDistance) {
      this.x -= directionX
      this.y -= directionY
    }
    else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX
        this.x -= dx / 10
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY
        this.y -= dy / 10
      }
    }
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particleArray = [];
  const gap = 2; //
  for (let y = 0; y < imageInfo.height; y += gap) {
    for (let x = 0; x < imageInfo.width; x += gap) {
      const index = (y * imageInfo.width + x) * 4;
      const alpha = imageInfo.data[index + 3];
      if (alpha > 0) {
        const particleX = x + 40;
        const particleY = y + 40;
        particleArray.push(new Particle(particleX * 2, particleY * 2));
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particleArray.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

init();
animate();
