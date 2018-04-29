function dodajNoda() {
	
	console.log("tworze nowy paragraf, result: " + (node != null));

	// node tekstowy:
	var tekst = document.createTextNode("ASDASD, node dodany przez skrypt\n");

	// trzeba dodac toto do struktury
	var destination = document.getElementsByTagName("body")[0];
	destination.insertBefore(node, destination.lastChild);
	// destination.insertBefore(tekst, destination.lastChild); tez zadziala normalnie

	// dodajmy jeszcze tekst do node
	node.parentNode.insertBefore(tekst, node.firstChild);
}

function dodajNoda2() {
	var node = document.createElement("p");
	var tekst = document.createTextNode("ASDASD, node dodany przez skrypt\n");
	node.appendChild(tekst);
	
	document.getElementsByTagName("body")[0].appendChild(node);
}

function usunNoda() {
	var nodeToDel = document.getElementsByTagName("p")[1];
	if(nodeToDel == null) {
		return;
	}
	var parent = nodeToDel.parentNode;
	if(parent!=null) {
		parent.removeChild(nodeToDel);
	}
}

function usunWszystkie() {
	var body = document.getElementsByTagName("body")[0];
	while(body.firstChild != null) {
		body.removeChild(body.firstChild);
	}
}

function klonujListe() {
	var lista = document.getElementById("listaDoSklonowania");
	var nowy = lista.lastChild.cloneNode(true); // true kopiuje caly branch
	
	// dopisz
	lista.appendChild(nowy);
}