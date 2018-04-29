function zmienNaglowek(kolor) {
	var node = document.getElementById("naglowek");
	node.style.background = kolor
	
	var tekst = node.firstChild;
	tekst.data = "IOIOIOIOIO POLICJA";
}

function nastawBudzik() {
	setTimeout(tajmerHandler, 3000);
	alert("nastawilem budzik");
}

function tajmerHandler() {
	alert("ADASDASDASDASDASDA WSTAWAJ");
}

function robMagieZObrazkiem() {
	setTimeout(obrazkowyHandler_wPrawo, 50)
}

// stop - nowe zrodlo eventu i clearTimeout(tajmer)
// zapetlam, ale mozna setInterval() - zawsze bedzie robic. potem clearInterval()
function obrazkowyHandler_wPrawo() {
	var node = document.getElementById("obrazek");
	var pos = parseInt(node.style.left);	
	pos+=3;
	node.style.left = pos+"px";
	
	if(pos < 100) {
		setTimeout(obrazkowyHandler_wPrawo, 50); 
	}
	else {

		setTimeout(obrazkowyHandler_wLewo, 50);
	}
}

function obrazkowyHandler_wLewo() {
	var node = document.getElementById("obrazek");
	var pos = parseInt(node.style.left);	
	pos-=3;
	node.style.left = pos+"px";
	
	if(pos > 0) {
		// zapetlam, ale mozna setInterval() - zawsze bedzie robic. potem clearInterval()
		setTimeout(obrazkowyHandler_wLewo, 50); 
	}
	else {
		// tym razem jedziemy w lewo
		setTimeout(obrazkowyHandler_wPrawo, 50);
	}
}

// mozna dodawac eventy z poziomu js - window.onload = fun
// albo window.addEventListener("onclick", fun)