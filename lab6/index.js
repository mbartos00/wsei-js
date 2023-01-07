const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const forceRange = document.getElementById('forceRange');
const numOfCircles = document.getElementById('circlesNum');

const canvasHeightInput = document.getElementById('canvasHeight');
const canvasWidthInput = document.getElementById('canvasWidth');

numOfCircles.setAttribute('min', 50)
numOfCircles.setAttribute('max', 800)

const ctx = canvas.getContext('2d');

//mouse position
let mousePos = {
  x: null,
  y: null,
  radius: ((canvas.height / window.innerHeight) * (forceRange.value || 80)) * ((canvas.width / window.innerWidth) * (forceRange.value || 80)),
};

window.addEventListener('mousemove', e => {
  mousePos.x = e.x;
  mousePos.y = e.y;
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  //draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#000';
    ctx.fill();
  }

  update() {
    //check if particle is within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    //check collision detection with mouse
    let dx = mousePos.x - this.x;
    let dy = mousePos.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mousePos.radius + this.size) {
      if (mousePos.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x +=10;
      }
      if (mousePos.x > this.x && this.x > this.size *10) {
        this.x -=10;
      }
      if (mousePos.y < this.y && this.y < canvas.height - this.size *10) {
        this.y +=10;
      }
      if (mousePos.y < this.y && this.y > this.size *10) {
        this.y -=10;
      }
    }

    //move particles that aren't collide with mouse
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}
let particlesArray;

const init = () => {
  particlesArray = [];
  let numberOfParticles = 400 ; // numOfCircles.value ||
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 1;
    let directionY = Math.random() * 5 - 1;
    let color = '#000';

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
};

const connectParticles = () => {
  //compare single particle to every other in particles array e.g 1-1, 1-2, 1-3...
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        ((particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x)) +
        ((particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y));
      if (distance < ((canvas.width / 7) * canvas.height) / 7) {
        ctx.strokeStyle = 'rgba(140,85,31,1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
   
  }

connectParticles();

};

const measureFps = () =>{
  const fpsContainer = document.getElementById('fps')
let be = Date.now(),fps=0,info='';
requestAnimationFrame(
    function loop(){
        let now = Date.now()
        fps = Math.round(1000 / (now - be))
        be = now
        requestAnimationFrame(loop)
        if (fps < 35){
          fpsContainer.style.color = "red"
          fpsContainer.textContent = fps 
        } if (fps >= 35 && fps <= 41) {
          fpsContainer.style.color = "deepskyblue"
          fpsContainer.textContent = fps + " FPS"
          } else {
            fpsContainer.style.color = "black"
            fpsContainer.textContent = fps + " FPS"
        }
        fpsContainer.value = fps;
        info+=(''+new Date()+' '+fps+'\n');
    }
 )
}

window.addEventListener('resize', () => {
  canvas.width =  canvasWidthInput.value || innerWidth;
  canvas.height = canvasHeightInput.value || innerHeight;
  mousePos.radius = ((canvas.height / window.innerHeight) * (forceRange.value || 80)) * ((canvas.width / window.innerWidth) * (forceRange.value || 80))
  init();
});

window.addEventListener('mouseout', () => {
  mousePos.x = undefined;
  mousePos.y = undefined;
});

startBtn.addEventListener('click', () =>{
  canvasHeightInput.setAttribute('max', window.innerHeight)
  canvasHeightInput.setAttribute('min', (window.innerHeight) / 5)
  canvasWidthInput.setAttribute('max', window.innerWidth)
  canvasWidthInput.setAttribute('min', (window.innerWidth) / 5)
  canvas.height= canvasHeightInput.value || window.innerHeight;
  canvas.width= canvasWidthInput.value || window.innerWidth;
  init();
  animate();
  startBtn.disabled = true
  measureFps()
  
})
resetBtn.addEventListener('click', () =>{
  particlesArray = []
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = ''
  canvas.height = ''
  startBtn.disabled = false

})

