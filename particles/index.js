const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
}


// document.addEventListener('click', (event) => {
//   mouse.x = event.x
//   mouse.y = event.y
//   drawCircle()
// })


const particlesArray = [];


class Particles {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.speedX = Math.random() * 1 - .5
    this.speedY = Math.random() * - .5
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x > canvas.width || this.x < 0) {
      this.x = Math.random() * canvas.width
    }
    if (this.y > canvas.height || this.y < 0) {
      this.y = Math.random() * canvas.height
    }
  }
  draw() {
    ctx.fillStyle = "grey"
    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.fill()
  }
}


function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particles())
  }
}


function moveParticles() {
  particlesArray.forEach((particle) => {
    particle.update()
    particle.draw()
  })
}


// document.addEventListener('mousemove', (event) => {
//   mouse.x = event.x
//   mouse.y = event.y
// })


document.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

// function drawCircle() {
//   ctx.fillStyle = "red"
//   ctx.beginPath()
//   ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2)
//   ctx.fill()
// }


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveParticles()
  requestAnimationFrame(animate)
}
animate()
init()


