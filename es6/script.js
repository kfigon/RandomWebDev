
// odpalamy z konsoli - node scipt.js

class Klasa {
    constructor(nazwa){
        this.nazwa= nazwa;
    }

    foo() {
        console.log("nazywam sie " + this.nazwa);
        return this.nazwa;
    }
}


console.log("Hello!");

let zmienna = 5;
const stala = 123;
zmienna = 43;

// stala = 3; compile error

let k = new Klasa("kLASA ASD");
k.foo();
