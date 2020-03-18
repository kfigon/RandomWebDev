console.log("foo");

// rejestrujemy event do wywolania
// jak 2 sekundy mina, silnik wrzuci event do kolejki.
// event queue czeka na pusty callstack biezacego kodu i wtedy
// robi to co w kolejce. Mamy nieblokujacy kod
setTimeout(() => console.log('inside timeout!'), 2000);

// wykona sie zawsze przed timeoutem, bo jest na stacku a loopa odpali sie
// dopiero potem, gdy stack bedzie pusty
console.log("end");