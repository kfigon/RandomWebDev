var szer = 0;
var wys=0;
function czysc() {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");

  ctx.clearRect(0, 0, canv.width, canv.height);
  szer = canv.width;
  wys = canv.height;
}

function Snake() {
  this.x=10;
  this.y=10;
  this.size = 10;

  this.vx=0;
  this.vy=1;

  this.ruch = function() {
    this.x+=this.vx*this.size;
    this.y+=this.vy*this.size;

    if(this.x<0) {
      this.x=0;
    }
    if(this.x+this.size > szer) {
      this.x=szer-this.size;
    }
    if(this.y < 0) {
      this.y=0;
    }
    if(this.y +this.size > wys) {
      this.y=wys-this.size;
    }
  };
  this.wLewo = function() {
    this.vx=-1;
    this.vy=0;
  };
  this.wPrawo = function() {
    this.vx=1;
    this.vy=0;
  }
  this.wGore = function() {
    this.vx=0;
    this.vy=-1;
  };
  this.wDol = function() {
    this.vx=0;
    this.vy=1;
  }
}
function rysujWeza(snake) {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(snake.x,
    snake.y,
    snake.size,
    snake.size);
}

window.onload = function(){
  var s = new Snake();
  document.addEventListener('keydown', evt => {
    switch (evt.code) {
      case 'ArrowRight': s.wPrawo(); break;
      case 'ArrowLeft':  s.wLewo();  break;
      case 'ArrowUp':    s.wGore();  break;
      case 'ArrowDown':  s.wDol();   break;
    }
  });
  // albo prototyp! document.mojKontext = s;
  // i w srodku handlera uzywac evt.target.mojKontext;
  setInterval(() =>{

    czysc();
    rysujWeza(s);
    s.ruch();

  }, 1000/5);
};
