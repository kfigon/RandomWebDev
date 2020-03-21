// symbols are primite value
// keys in objects

test('symbols', ()=>{
    const uid = Symbol(); // not new!
    
    const person = {
        [uid]: 'p1',
        name: 'foo'
    };

    //  zeby nikt nam nie nadpisal person.uid, musi znac klucz
    // unique id ktorych nie mozna nadpisac
    // mozna tylko gdy person[uid] = 'asd'
    // console.log(person.uid); // undefined

    expect(person.uid).toBeUndefined();
    expect(person[uid]).toBe('p1');
});

test('well known symbols', ()=>{
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols
// np. do robienia iteratorow, toString albo regexow

    const uid = Symbol(); // not new!
        
    const person = {
        [uid]: 'p1',
        name: 'foo',
        [Symbol.toStringTag]: 'this is my object'
    };

    expect(person.toString()).toBe('[object this is my object]');
    expect(person.toString()).not.toBe('[object Object]');
});
