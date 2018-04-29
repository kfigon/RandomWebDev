console.log("hello");

// tagi i elementy w htmlu (biale znaki tez)
// sa zbudowane na zasadzie drzewa.

// moge sie do tego dobrac:
var node = document.currentScript.parentNode;

var sciezka = node.nodeName;

while(node.parentNode != null) {
  node = node.parentNode;
  sciezka = node.nodeName +" > " + sciezka;
}

document.write("DOM do skryptu: " +sciezka);
// a stad mozna juz modyfikwoac tag
// warto oznaczac tagi atrybutem id dla latwego dostepu
