function czysc() {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");

  ctx.clearRect(0, 0, canv.width, canv.height);
}

function Snake() {
  this.x=10;
  this.y=10;
  this.size = 10;

  this.vx=0;
  this.vy=1;

  this.ruch = function() {
    this.x+=this.vx;
    this.y+=this.vy;
  };
  this.wLewo = function() {
    this.vx=1;
    this.xy=0;
  };
  this.wPrawo = function() {
    this.vx=-1;
    this.xy=0;
  }
  this.wGore = function() {
    this.vx=0;
    this.xy=-1;
  };
  this.wDol = function() {
    this.vx=0;
    this.xy=1;
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
  document.addEventListener('keydown', function(evt) {
    switch (evt.code) {
      case 'ArrowRight': s.wPrawo(); break;
      case 'ArrowLeft':  s.wLewo();  break;
      case 'ArrowUp':    s.wGore();  break;
      case 'ArrowDown':  s.wDol();   break;
    }
  });
  setInterval(function () {
    rysujWeza(s);
    s.ruch();
  }, 1000/50);
};
