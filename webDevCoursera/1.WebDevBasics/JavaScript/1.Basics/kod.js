function wolajWszystko() {
  document.write("to zostalo wpisane z innego pliku<br>");


  var tab =[1,2,3,4,5];
  // var tab= new Array(5)
  console.log("petla");
  for (var i = 0; i < tab.length; i++) {
    console.log("["+i+"] "+tab[i]);

    var napis = i+"pisze petle";
    document.write(napis+"<br>");
  }
}


wolajWszystko();
