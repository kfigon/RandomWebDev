document.write("hello world")

var tab=[5,234,6,32,432]
// od 0 do rozmiaru (indeksu)
for (var a in tab) {
  console.log(a);
}

// foreach
for (var a of tab) {
  console.log(a);
}

// wszystko normalnie dziala
var napis="abc"
console.log(napis[1]);

var zwierzeta = ["pies", "kot", "chomik"];
// nie tyka tablicy. Tablice zmieni splice()
var czescZwierzat = zwierzeta.slice(1,3);
console.log(czescZwierzat);


console.log(zwierzeta);
// dodaj do tablicy zwierzat piesela (bez uzycia splice z dodatkowymi parametrami)
var indeksDoDodania = 2;
var noweZwierzeta = Array(zwierzeta.length+1)
for (var i = 0; i < noweZwierzeta.length ; i++) {
  if(i<indeksDoDodania) {
    noweZwierzeta[i]=zwierzeta[i];
  }
  else if (i == indeksDoDodania) {
    noweZwierzeta[i] = "piesel";
  }
  else {
    noweZwierzeta[i]=zwierzeta[i-1];
  }
}

console.log(noweZwierzeta);
