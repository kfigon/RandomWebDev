function czysc() {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");

  ctx.clearRect(0, 0, canv.width, canv.height);
}
function rysuj() {
  var canv = document.getElementById('myCanvas');
  var ctx = canv.getContext("2d");

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(10,10,50,50);

  ctx.fillStyle = "#0000FF";
  ctx.fillRect(80,80,50,50);
}

window.onload = function(){
  console.log("asd");
  rysuj();
};
