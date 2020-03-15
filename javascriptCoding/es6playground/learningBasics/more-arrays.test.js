test('for of', ()=>{
    const arr= [1,2,3]; // new Array(1,2,3)
    // ale new Array(3) - predefined length!
    let sum = 0;
    for(const el of arr)
        sum+=el;
    
    expect(sum).toBe(6);
});

test('creating arrays', ()=>{
    const arrayof = Array.of(3); // [3]
    expect(arrayof.length).toBe(1);

    // create array from array-like obj, split letters here
    const from = Array.from("Kamil");
    expect(from.length).toBe(5);
});

test('array methods', ()=>{
    const foo = ['first', 'second', 'third'];
    foo.push('fourth'); // add to the end
    foo.unshift('zero') // add to the start. Returns length of array

    expect(foo).toEqual(['zero', 'first', 'second', 'third', 'fourth']);

    const removed = foo.pop();
    expect(removed).toBe('fourth');
    expect(foo).toEqual(['zero', 'first', 'second', 'third']);

    foo.shift(); // remove from the start, move all to the left
    expect(foo).toEqual(['first', 'second', 'third']);

    foo[6]='asd';
    // yeah...
    expect(foo).toEqual(['first', 'second', 'third', ,,,'asd']);
    expect(foo.length).toBe(7);
});

test('splice', ()=>{
    // returns removed elements
    // negative numbers are allowed, like in python

    const arr=[1,2,3,4,5];
    arr.splice(1, 2); // remove 2 elements, starting from 1
    expect(arr).toEqual([1,4,5]);

    arr.splice(1,0, 2,3); // replace removed items with 2 and 3. insert in index
    expect(arr).toEqual([1,2,3,4,5]);

    arr.splice(0);
    expect(arr.length).toBe(0); // clear whole arr
});

test('slice', ()=>{
    const arr=[1,2,3,4,5];
    const newArr = arr.slice(2, 4);
    expect(newArr).toEqual([3,4]);

    // copy
    const copiedArray = arr.slice();
    expect(copiedArray).toEqual(arr);
    expect(copiedArray).not.toBe(arr);
});

test('concat', ()=>{
    // zwracan nowa tablice
    const a = [1,2,3];
    const b = [4,5,6];
    const c = a.concat(b);
    expect(a).toEqual([1,2,3]);
    expect(b).toEqual([4,5,6]);
    expect(c).toEqual([1,2,3,4,5,6]);
});

test('finding elements', ()=>{
    const a = [1,2,3,2];
    expect(a.indexOf(2)).toBe(1);

    // nie zadziala na typy referencyjne, od tego jest find gdzie podajemy callback
});

test('functional', ()=>{
    const ar = [
        {name:'asd', val:2},
        {name:'sad', val:4},
        {name:'foo', val:3},
        {name:'bar', val:6}
    ];

    // ar.forEach()
    // argumenty wszystkich funkcyjnych - (object, index, allTab)
    const vals = ar.map((o)=> o.val);
    expect(vals).toEqual([2,4,3,6]);
    // sort - by default converts to string (even numbers! 10 < 2)

    const filtered = ar.filter(o => o.val >= 4);
    expect(filtered.map(x => x.name)).toEqual(['sad','bar']);

    const reduced = ar
                .map(o => o.val)
                .reduce((prev, cur)=> prev+cur, 0); // initial val
    expect(reduced).toBe(15);
});

test('spread operator', ()=>{
    const ar = [1,2,3,4,5];
    const copiedAr = [...ar]; 

    //  to change array to list of comma separated values
    const smallest = Math.min(3,4,5,1,3,4,5);
    const minimum = Math.min(...ar);

    // kopiuje referencje, nie jest to deep copy
    // deep copy mozna zrobic [...arrOfObjects.map()] i kopiowac 
});

test('array destructuring', ()=>{
    // podobnie jak w pythonie
    const names=['Foo', 'Bar', "asd", 'sad'];
    const [first,second, ...restOfEls] = names; // spread optional here
    expect(first).toBe('Foo'); 
    expect(second).toBe('Bar'); 
});

test('sets', ()=>{
    // duplicates not allowed, no indexes. Like in java
    const set = new Set([1,2,3,4,5,1]);
    const ar = Array.from(set);

    expect(set).toEqual(new Set([1,2,3,4,5]));
    expect(set.has(2)).toBe(true);

    // for (const entry of set.values()){
        // console.log(entry);
    // }
});

test('maps', ()=>{
    // good performance for large sets
    
    // obj moga byc mapa, ale tu kluczem moze byc cokolwiek, 
    // nie tylko string
    const person = {name: 'Foo', age:18};
    const personMapped = new Map([['name','Foo'],['age', 18]]);

    // person obj is key here. checks reference
    // const personData = new Map([[person, 'some value' ]])\
    expect(personMapped.get('name')).toBe(person.name);
    expect(personMapped.get('age')).toBe(person.age);
});