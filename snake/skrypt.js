var szer = 0;
var wys=0;
function czysc() {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");

  ctx.clearRect(0, 0, canv.width, canv.height);
  szer = canv.width;
  wys = canv.height;
}

function losujJablko() {
  var size=10;
  return {x: Math.floor(Math.random()*(szer)),
          y: Math.floor(Math.random()*(wys)),
        size: size};
}

function Snake() {
  this.x=10;
  this.y=10;
  this.size = 10;

  this.vx=0;
  this.vy=1;
  this.ogon =[{x:this.x, y:this.y}, {x:this.x,y:this.y}, {x:this.x,y:this.y}];

  this.przesujOgon =function() {
    for(var i=0; i<this.ogon.length-1; i++){
        this.ogon[i]=this.ogon[i+1];
    }
    this.ogon[this.ogon.length-1] = {x:this.x, y:this.y};
  };

  this.czyZjedzono = function (jablko) {
    var x = this.x;
    var jx = jablko.x;
    var y = this.y;
    var jy = jablko.y;
    var dx = Math.abs(x-jx);
    var dy = Math.abs(y-jy);
    return (dx < this.size && dy<this.size);
  };

  this.rosnij = function () {
    this.ogon.push({x:this.x, y:this.y});
  };

  this.ruch = function() {
    this.x+=this.vx*this.size;
    this.y+=this.vy*this.size;

    this.przesujOgon();

    if(this.x<0) {
      this.x=szer-this.size;
    }
    if(this.x+this.size > szer) {
      this.x=0;
    }
    if(this.y < 0) {
      this.y=wys-this.size;
    }
    if(this.y +this.size > wys) {
      this.y=0;
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

  for(var i=0; i<snake.ogon.length; i++){
    ctx.fillRect(snake.ogon[i].x,
      snake.ogon[i].y,
      snake.size,
      snake.size);
  }
}

function rysujJablko(jablko) {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(jablko.x, jablko.y, jablko.size, jablko.size);
}

window.onload = function(){
  var s = new Snake();
  var canv = document.getElementById('myCanvas');
  szer = canv.width;
  wys = canv.height;

  document.addEventListener('keydown', evt => {
    switch (evt.code) {
      case 'ArrowRight': s.wPrawo(); break;
      case 'ArrowLeft':  s.wLewo();  break;
      case 'ArrowUp':    s.wGore();  break;
      case 'ArrowDown':  s.wDol();   break;
    }
  });

  var jablko = losujJablko();

  // albo prototyp! document.mojKontext = s;
  // i w srodku handlera uzywac evt.target.mojKontext;
  setInterval(() =>{

    czysc();
    rysujJablko(jablko);
    rysujWeza(s);
    s.ruch();
    if(s.czyZjedzono(jablko)) {
      s.rosnij();
      jablko = losujJablko();
    }

  }, 1000/10);
};
