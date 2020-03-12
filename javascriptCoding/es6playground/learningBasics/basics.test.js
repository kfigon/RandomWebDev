// run with npm run test/npm test

test('some logic', () => {
    const a= true;
    const b = false;

    expect(a).toBe(true);
    expect(b && a).toBe(false);

    let foo = (x,y) => {
        return x+y > 3 ?
        '>3' : 
        '<=3';
    }

    expect(foo(1,1)).toBe('<=3');
    expect(foo(1,3)).toBe('>3');
});

test('typeof test', () =>{
    expect(typeof 'foo').toBe('string');
    expect(typeof []).toBe('object');
    expect(typeof {}).toBe('object');
    expect(typeof null).toBe('object');
    expect(typeof undefined).toBe('undefined');
    expect(typeof NaN).toBe('number');

    function foo(params) {}
    expect(typeof foo).toBe('function');

    const lambda = () => {};
    expect(typeof lambda).toBe('function');
});


test('array', ()=>{
    let ar = [1,2,3,4,5];
    const another = ar.map((x)=> { return x*2; });
    
    expect(ar).toStrictEqual([1,2,3,4,5]);
    expect(another).toStrictEqual([2,4,6,8,10]);
});

test('for of (each)', () => {
    const ar = [1,2,3,4,5];
    let s=0;
    for(let i of ar)
        s+=i;

    expect(s).toBe(15);
});

test('for loop', () => {
    let sum = 0;
    for(let i=0; i<5; i++)
        sum+=i;

    expect(sum).toBe(10);
});

test('for in loop', ()=>{
    const obj={
        x:15,
        y:3
    }
    let sum = 0;
    for(const key in obj) {
        sum += obj[key];
    }

    expect(sum).toBe(18);
})

// testy parametryczne
for(let i=0; i<5; i++) {
    test('test '+i, () => {
        expect(i).toBe(i);
    });
}

test('boolean magic', ()=> {
    const someValue = "Hello!";
    const nullValue = null;
    
    const getSomethingOrDefault = null || someValue;
    const castToBoolean = !!someValue;
    const getSomethingAfterAllChecked = someValue && "value123";

    expect(getSomethingOrDefault).toBe("Hello!");
    expect(castToBoolean).toBe(true);
    expect(getSomethingAfterAllChecked).toBe("value123");
});

test('exceptions', ()=>{
    const failWIthString = () => {
        throw 'myException';
    }

    const failWithNumber = () => {
        throw 123;
    }
    const failWithObject = () =>{
        throw {message: 'oops'};
    }

    try {
        failWIthString();
    }
    catch(ex) {
        expect(ex).toBe('myException');
    }

    try {
        failWithNumber();
    }
    catch(ex) {
        expect(ex).toBe(123);
    }
    
    try {
        failWithObject();
    }
    catch(ex) {
        expect(ex.message).toBe('oops');
    }finally{
        expect(true).toBe(true);
    }
});