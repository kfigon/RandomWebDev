// zeby uniknac callback hell
// mozna pisac kod asynchroniczny ladniej za pomoca promis
// nowsze api maja promisy zamiast callbackow

// wlasna promisa na podstawie setTimeout:

const timerCallback = (myDataToLog) => console.log(myDataToLog);

function setTimer(duration) {

    // promisa przyjmuje 2 funkcje, dostaniemy je od silnika
    // mozna do resolve przekazac jakies dane, wyladuja one w then
    // ta funkcja do kontruktora wywolywana jest od razu, zanim konstruktor zwroci obiekt
    const promise = new Promise((resolve, reject) => {
    // tutaj logika co gdy jest ok - wtedy zawolac resolve
    // np. sprawdzanie statusu http - wtedy resolve
        setTimeout(() => resolve('it worked!'), duration);
    });
    return promise;
};

setTimer(3000)
    .then(timerCallback)

console.log("Starting all promises...");