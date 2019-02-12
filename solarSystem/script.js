let sun = new Image();
let moon = new Image();
let earth = new Image();

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let config = {
  earth: {
    x: 150,
    y: 150,
    turnTime: 100 * 1000, // поворот вокруг солнца
    start: Math.PI / 2,
    radius: 100,
    size: 24,
    selfTurnTime: 3 * 1000, // поворот вокруг оси 
  },
  moon: {
    turnTime: 3 * 1000, // поворот вокруг земли
    start: Math.PI,
    radius: 20,
    speed: 0,
    size: 7
  }
}

class CircleMove {
  /*
  сдвигает систему координат контекста для рисования
  центр вращения помещается в (0, 0)
  */
  constructor(ctx, config, draw) {
    this.ctx = ctx;
    this.start = config.start || 0; // начальная позиция в радианах
    this.drawCallback = draw;
    this.centerX = config.x || 0;
    this.centerY = config.y || 0;
    this.radius = config.radius || 0;
    this.turnTime = config.turnTime; // время одного оборота в миллисекундах
  }

  draw(progress, centerX, centerY) {
    this.centerX = centerX || this.centerX;
    this.centerY = centerY || this.centerY;

    this.ctx.save();
    this.setContext(progress);
    this.drawCallback(progress);
    this.ctx.restore();
  }

  setContext(progress) {
    // сдвинуть сетку координат к центру вращения
    this.ctx.translate(this.centerX, this.centerY);

    let angle = this.countAngle(progress);
    
    // повернуть контекст на найденный угол
    this.ctx.rotate(angle);

    // сдвинуть на величину радиуса
    this.ctx.translate(this.radius, 0);
  }

  countAngle(progress) {
    // рассчитать оставшуюся часть оборота
    let rest = progress % this.turnTime;
    let turnPart = rest * Math.PI * 2 / this.turnTime - this.start;
    return turnPart;
  } 
}

let circleMoon = new CircleMove(ctx, config.moon,
  (progress) => {
    ctx.drawImage(moon, -config.moon.size / 2, -config.moon.size / 2);
  }
);

let circleEarth = new CircleMove(ctx, config.earth,
  (progress) => {
    circleMoon.draw(progress);

    ctx.save();

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,-12,50,24); // Тень Земли

    let selfRotateAngle = (progress % config.earth.selfTurnTime) * Math.PI * 2 / config.earth.selfTurnTime; 
    ctx.rotate(selfRotateAngle); // вращение Земли вокруг своей оси
    ctx.drawImage(earth, -config.earth.size / 2, -config.earth.size / 2);

    ctx.restore();
  }
);

let start = new Date();

function draw() {
  let progress = new Date() - start;

  ctx.clearRect(0,0,300,300); // clear canvas

  ctx.beginPath();
  ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
  ctx.stroke();


  circleEarth.draw(progress);

  window.requestAnimationFrame(draw);
}

function init(){
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

  canvas.style.background = 'url(https://mdn.mozillademos.org/files/1456/Canvas_sun.png}) no-repeat';

  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  window.requestAnimationFrame(draw);
}

init();