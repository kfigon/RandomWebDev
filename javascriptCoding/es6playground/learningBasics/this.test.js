test('basic this', ()=>{
    const obj = {
        name: 'foo',
        bigName: function(){
            return this.name.toUpperCase();
        }
    }
    // this - to, co go wola
    // wiec obj.bigName() - obj === this
    expect(obj.name).toBe('foo');
    expect(obj.bigName()).toBe('FOO');
});

// w callbackach czesto sa problemy z this, 
// bo przekazujemy wskaznik do funkcji i gubimy wykonawce
// wtedy zamiast pointera do funkcji przekazujemy lambde z zawolaniem:
// () => this.myFoo. Albo bind.
// albo pole klasy bedace lambda - wtedy this zawsze hest dibrze zbindowane
test('strange this - bind',()=>{
    const obj = {
        bar: 'foo',
        bigName(){ // same syntax
            return this.bar.toUpperCase();
        }
    }

    let {bigName} = obj;
    // tutaj this to jest odpowiednik window w node.
    // this to poziom wyzej, kontekst TUTAJ. global context
    // nie ma bar w this
    expect(() => bigName()).toThrow(new TypeError("Cannot read property 'toUpperCase' of undefined"));
    
    // workaround: bind do czego ma sie odnosic this wewnatrz 
    bigName = bigName.bind(obj);
    expect(bigName()).toBe('FOO');
});

test('call apply', ()=>{
    const obj = {
        bar: 'foo',
        bigName(){
            return this.bar.toUpperCase();
        }
    }

    let {bigName} = obj;
    // call binduje i od razu wola
    expect(bigName.call(obj)).toBe('FOO');
    // jak call, ale:
    // call przyjmuje reszte argumentow jako comma separated
    // apply jako lista argumentow [] 
    expect(bigName.apply(obj)).toBe('FOO');
});

test('this & arrows', ()=>{
    const obj = {
        bar: 'foo',
        bigName: ()=>{
            // arrows dont know this, this will be the same as outside
            // function. keeps bindings as it would be outside
            return this.bar.toUpperCase();
        }
    };
    expect(() => obj.bigName()).toThrow(new TypeError("Cannot read property 'toUpperCase' of undefined"));
    
    const {bigName} = obj;
    expect(() => bigName()).toThrow(new TypeError("Cannot read property 'toUpperCase' of undefined"));
});