// class syntax
class AC {  // metody sa w proto
    constructor(x) { this.x=x; }
    foo() {  console.log('foo from AC'); }
    baseMethod() { console.log('base method!');}
}

class BC extends AC {   // laczymy sie z proto AC
    constructor(x) { super(x); }
    foo() {  console.log('foo from BC'); }
}

const ac = new AC(123);
const bc = new BC(123);

ac.foo();        // AC
ac.baseMethod(); // base

bc.foo();        // BC
bc.baseMethod(); // base


// vanilla JS without proto. Dziala, ale kazdy obiekt ma
// metody jako membery - zajmuje miejsce, bo implementacja
// jest 'pokopiowana' w kazdym obiekcie
console.log("\nvanila without proto");

function AWP (x) {
    this.x=x;
    this.base = function() { console.log("base"); }
    this.foo=function() { console.log("AWP"); }
}

function BWP (x) {
    AWP.call(this, x);
    this.foo=function() { console.log("BWP"); }
}

const awp = new AWP(123);
awp.base(); // base
awp.foo();  //AWP

const bwp = new BWP(123);
bwp.base(); // base
bwp.foo();  // BWP


// vanilla js with proto
console.log("\nvanila with proto");

function AP (x) {
    this.x=x;
}
AP.prototype.base = function() { console.log("base"); }
AP.prototype.foo = function() { console.log("AP"); }

// link classes
Object.setPrototypeOf(BP.prototype, AP.prototype);
function BP (x) {
    AP.call(this, x);   
}
BP.prototype.foo=function() { console.log("BP"); }

const ap = new AP(123);
ap.base(); // base
ap.foo();  //AP

const bp = new BP(123);
bp.base(); // base
bp.foo();  // BP
