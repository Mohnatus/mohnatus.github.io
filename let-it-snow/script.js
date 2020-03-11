// from: https://codepen.io/loktar00/pen/CHpGo?q=snow&order=popularity&depth=everything&show_forks=false
// from: https://codepen.io/rukouen/pen/NbrOag

/* flake */
    function Flake(config) {
        this.canvas = config.canvas;
        this.ctx = config.ctx;
        this.x = Math.floor(Math.random() * this.canvas.width);
        this.y = Math.floor(Math.random() * this.canvas.height);
        this.size = (Math.random() * 3) + 2;
        this.speed = (Math.random() * 1) + 0.5;
        this.opacity = (Math.random() * 0.05) + 0.3;
        this.velY = this.speed;
        this.velX = 0;
        this.stepSize = (Math.random()) / 30;
        this.step = 0;
    }
    Flake.prototype.draw = function() {
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    };

/* firework particle */
    function Particle(config) {
        this.ctx = config.ctx;

        this.lifespan = 600;
        this.initialSpeed = 4.5;
        this.gravity = 9.8;

        this.x = config.x || 0;
        this.y = config.y || 0;
        this.red = config.red || Math.floor(Math.random() * 255);
        this.green = config.green || Math.floor(Math.random() * 255);
        this.blue = config.blue || Math.floor(Math.random() * 255);

        this.isFixedSpeed = config.isFixedSpeed;
        this.radius = 1 + Math.random();
        this.angle = Math.random() * 360;
        this.speed = (Math.random() * config.speed) + 0.1;
        this.velocityX = Math.cos(this.angle) * this.speed;
        this.velocityY = Math.sin(this.angle) * this.speed;
        this.startTime = (new Date()).getTime();
        this.duration = Math.random() * 300 + this.lifeSpan;
        this.currentDiration = 0;
        this.dampening = 30;
        this.colour = this.getColour();

        if (this.isFixedSpeed) {
            this.speed = config.speed;
            this.velocityY = Math.sin(this.angle) * this.speed;
            this.velocityX = Math.cos(this.angle) * this.speed;
        }

        this.initialVelocityX = this.velocityX;
        this.initialVelocityY = this.velocityY;
    }
    Particle.prototype.animate = function() {
        this.currentDuration = (new Date()).getTime() - this.startTime;

         if (this.currentDuration <= 200) {
            this.x += this.initialVelocityX * this.initialSpeed;
            this.y += this.initialVelocityY * this.initialSpeed;
            this.alpha += 0.01;
            this.colour = this.getColour(240, 240, 240, 0.9);
            
        } else {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + (Math.random() * 0.3));
        }

        this.velocityY += this.gravity / 1000;

        if (this.currentDuration >= this.duration) {
            this.velocityX -= this.velocityX / this.dampening; 
            this.velocityY -= this.velocityY / this.dampening;
        }

        if (this.currentDuration >= this.duration + this.duration / 1.1) {
            this.alpha -= 0.02;
            this.colour = this.getColour();
        } else {
            if (this.alpha < 1) {
                this.alpha += 0.03;
            }
        }
    }
    Particle.prototype.render = function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.colour;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = this.getColour(this.red + 150, this.green + 150, this.blue + 150, 1);
        this.ctx.fill();
    }
    Particle.prototype.getColour = function(red, green, blue, alpha) {
        red = red || this.red;
        green = green || this.green;
        blue = blue || this.blue;
        alpha = alpha || this.alpha;
        return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    }

/* snowfall */
    function Snowfall(config) {
        this.canvas = document.querySelector(config.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.flakes = [];
        this.flakeCount = config.count;
        this.mx = this.my = -100;
        this.minDist = 150;

        this.fireworkParticles = 150;
        this.fireworkChance = 0.01;
        this.baseFireworkSpeed = 0.6;

        this.particles = [];
        this.disableAutoFireworks = false;
        this.resetDisable = 0;

        this.inProcess = true;

        this.init();
    }

    Snowfall.prototype.init = function() {
        var that = this;

        this.setAnimationRequest();
        this.setSizes();

        this.canvas.addEventListener("mousemove", function(e) {
            that.mX = e.clientX,
            that.mY = e.clientY
        });

        for (var i = 0; i < this.flakeCount; i++) {
            this.flakes.push(new Flake({canvas: this.canvas, ctx: this.ctx}));
        }

        this.snow();
    };

    Snowfall.prototype.snow = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.inProcess) {
            for (var i = 0; i < this.flakeCount; i++) {
                var flake = this.flakes[i],
                    x = this.mX,
                    y = this.mY,
                    minDist = this.minDist,
                    x2 = flake.x,
                    y2 = flake.y;

                var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                    dx = x2 - x,
                    dy = y2 - y;

                if (dist < minDist) {
                    var force = minDist / (dist * dist),
                        xcomp = (x - x2) / dist,
                        ycomp = (y - y2) / dist,
                        deltaV = force / 2;

                    flake.velX -= deltaV * xcomp;
                    flake.velY -= deltaV * ycomp;

                } else {
                    flake.velX *= .98;
                    if (flake.velY <= flake.speed) {
                        flake.velY = flake.speed
                    }
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                }

                this.ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
                flake.y += flake.velY;
                flake.x += flake.velX;
                    
                if (flake.y >= this.canvas.height || flake.y <= 0) {
                    this.reset(flake);
                }


                if (flake.x >= canvas.width || flake.x <= 0) {
                    this.reset(flake);
                }

                this.ctx.beginPath();
                flake.draw();
                this.ctx.fill();
            }
            requestAnimationFrame(this.snow.bind(this));
        } else {
            this.canvas.classList.add('firework');
            this.firework();
        }
    };

    Snowfall.prototype.reset = function(flake) {
        flake.x = Math.floor(Math.random() * this.canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;
        flake.speed = (Math.random() * 1) + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;
    };

    Snowfall.prototype.getFirework = function() {
        var that = this;
        this.inProcess = false;

        this.canvas.addEventListener('click', function(e) {
            that.createFirework(e.clientX, e.clientY);
            that.disableAutoFireworks = true;
            clearTimeout(that.resetDisable);
            that.resetDisable = setTimeout(() => {
                that.disableAutoFireworks = false;
            }, 5000);
        });

        this.createFirework();
    }

    Snowfall.prototype.firework = function() {
        if (!this.disableAutoFireworks && Math.random() < this.fireworkChance) {
            this.createFirework();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.animate();
            particle.render();
            if ( particle.y > this.canvas.height || particle.x < 0 ||
                particle.x > canvas.width || particle.alpha <= 0 ) {
                    this.particles.splice(i, 1);
                }
        }
        requestAnimationFrame(this.firework.bind(this));
    }

    Snowfall.prototype.createFirework = function(x, y) {
        x = x || Math.random() * this.canvas.width,
        y = y || Math.random() * this.canvas.height;
        var speed = (Math.random() * 2) + this.baseFireworkSpeed;
        var maxSpeed = speed;
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);

        red = (red < 150 ? red + 150 : red);
        green = (green < 150 ? green + 150 : green);
        blue = (blue < 150 ? blue + 150 : blue);

        for (var i = 0; i < this.fireworkParticles; i++) {
            var particle = new Particle({ctx: this.ctx, x:x, y:y, red:red, green: green, blue: blue, speed: speed});
            this.particles.push(particle);
            maxSpeed = (speed > maxSpeed ? speed : maxSpeed);
        }

        for (let i = 0; i < 40; i++) {
            var particle = new Particle({ctx: this.ctx, x:x, y:y, red:red, green:green, blue:blue, speed:maxSpeed, isFixedSpeed:true});
            this.particles.push(particle);
        }
    };



    Snowfall.prototype.setSizes = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener("resize",function(){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    };

    Snowfall.prototype.setAnimationRequest = function() {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        window.requestAnimationFrame = requestAnimationFrame;
    };

    

/* seconds countdown */

    function SecondsCountdown(config) {
        this.$ = config.element;
        this.$block;
        this.time = config.time;

        this.interval;
        this.onStop = config.onStop;
        this.init();
    }


    SecondsCountdown.prototype.init = function() {
        this.$block = $('<span class="sec">');

        this.update();

        this.$.append('00 : ').append(this.$block);
    };

    SecondsCountdown.prototype.start = function() {
        var that = this;
        this.interval = setInterval( function() {
            if (that.time < 0) {
                that.stop();
                that.$.remove();
                return;
            }
            that.update();
            that.time--;
        }, 1000);
    };

    SecondsCountdown.prototype.stop = function() {
        clearInterval(this.interval);
        if (this.onStop) this.onStop();
    };

    SecondsCountdown.prototype.update = function() {
        var text = this.time < 10 ? '0' + this.time : this.time;
        this.$block.text(text);
    };

/* lines showner */

    function LinesShowner(config) {
        this.lines = config.lines;
        this.$ = config.element;
        this.delay = config.delay || 0;
        this.counter = 0;
        this.timeout;
        this.update();
    }

    LinesShowner.prototype.update = function() {
        var that = this;
        
        if (this.counter >= this.lines.length) {
            clearTimeout(this.timeout);
            return;
        }
        var line = this.lines[this.counter];
        this.changeLine(line.text, line.type);
        this.counter++;
        setTimeout( function () { that.update(); }, line.time );
    };

    LinesShowner.prototype.changeLine = function(text, type) {
        type = type || '';
        this.$.fadeOut(350, function() {
            $(this).attr('data-type', type).html(text).fadeIn(350);
        });
    };

/* gradient */
    function gradient() {
           
        var colors = new Array(
            [62,35,255],
            [60,255,60],
            [255,35,98],
            [45,175,230],
            [255,0,255],
            [255,128,0]);
        var step = 0;
        var colorIndices = [0,1,2,3];
        var gradientSpeed = 0.002;

        function updateGradient() {
            if ( $===undefined ) return;
            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];
            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";
            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";

            $('#canvas')
                .css({background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"})
                .css({background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
        
            step += gradientSpeed;
            if ( step >= 1 ) {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];
                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
            }
        }

        setInterval(updateGradient,10);
    }
/* script */
$(document).ready(function() {
    gradient();
    var snowfall = new Snowfall({
        canvas: '#canvas', 
        count: 400
    });
    var secondsCountdown = new SecondsCountdown({
        element: $('#timer'), 
        time: 68,
        onStop: function() {
            snowfall.getFirework();
        }
    });
    secondsCountdown.start();

    var linesShowner = new LinesShowner({
        lines: [{
                    "text": "Поздравляем с&nbsp;наступающим Новым&nbsp;годом!",
                    "time": 3000
                },{
                    "text": "И дарим вам<br>68&nbsp;волшебных секунд",
                    "time": 3000
                },{
                    "text": "Загадайте желание",
                    "time": 5000
                },{
                    "text": "Подумайте о том,",
                    "time": 3000
                },{
                    "text": "чего вам хотелось&nbsp;бы достичь<br> в&nbsp;Новом году",
                    "time": 5000
                },{
                    "text": "В какое путешествие<br> вы хотели&nbsp;бы отправиться?",
                    "time": 5000
                },{
                    "text": "Что новое попробовать?",
                    "time": 5000
                },
                //{
                //     "text": "Что изменить?",
                //     "time": 3000
                // },
                {
                    "text": "Похвалите себя за&nbsp;отличную работу в&nbsp;2017&nbsp;году",
                    "time": 3000
                },{
                    "text": "Что вам удалось?",
                    "time": 5000
                },{
                    "text": "Чем вы гордитесь больше всего?",
                    "time": 5000
                },{
                    "text": "Отлично!",
                    "time": 4000
                },{
                    "text": "Пусть 2018 год",
                    "time": 3000
                },{
                    "text": "будет щедрым<br> на&nbsp;приятные сюрпризы,",
                    "time": 3000
                },{
                    "text": "приключения и удачу",
                    "time": 3000
                },{
                    "text": "Смейтесь от&nbsp;души и&nbsp;радуйтесь&nbsp;каждому&nbsp;дню",
                    "time": 3000
                },{
                    "text": "Всё получится!",
                    "time": 4000
                },{
                    "text": "Спасибо, что были с&nbsp;нами<br> в этом году!",
                    "time": 3000
                },{
                    "text": "ваш «Читай-город»",
                    "time": 3000
                }
            ],
            element: $('#text')
    });
});
    