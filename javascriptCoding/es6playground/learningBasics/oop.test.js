// export default class - widoczne na zewnatrz
// potem import Animal from './nazwapliku';
// nie wspierane przez przegladarki (chyba ze babel)
// alternatywa z node.js:
// module.exports=GameArea;
// const GameArea = require('./gameOfLife.js')
// wiele - module.exports={
    // GameArea: GameArea,
    // Field: Field }
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return 'generic sound';
    }
}

class Dog extends Animal {

    speak() {
        return 'bark!';
    }

    // computed property
    get newfield() {
        return 'foo';
    }
}

test('base oo', () => {
    let a = new Animal('scruffy');

    expect(a.speak()).toBe('generic sound');
});

test('inheritance - constructor inheritance, fields', ()=>{
    let d = new Dog('asd');
    expect(d.speak()).toBe('bark!');
    expect(d.name).toBe('asd')
    expect(d.newfield).toBe('foo')
});

test('statics',()=>{
    class Foo{
        // static somefield = 'sad'; not work in this kind of inner class
        static method() {
            return 'asd';
        }
    }

    expect(Foo.method()).toBe("asd");
    // expect(Foo.somefield).toBe("sad");
});

