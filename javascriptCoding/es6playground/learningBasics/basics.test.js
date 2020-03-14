// run with npm run test/npm test

test('some logic', () => {
    const a= true;
    const b = false;

    expect(a).toBe(true);
    expect(b && a).toBe(false);

    const foo = (x,y) => {
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

test('reference and values', ()=>{
    // primitives
    let num = 1;
    const foo=(x)=> x = 2;
    foo(num);
    expect(num).toBe(1);

    let str = 'asd';
    const foo2=(x)=> x = 'fooo';
    foo2(str);
    expect(str).toBe('asd');

// reference
    let obj = {foo:'asd'};
    const foo3=(x)=> x.foo = 'fooo';
    foo3(obj);
    expect(obj.foo).toBe('fooo');
});

test('function fun', ()=>{
    // expression. Name is optional. Anonymous fun
    const start = function startGame() {}
    // startGame(); will fail
    start();
    
    // declaration
    function stop() {}

    // roznica - declaration bedzie hoistowane, 
    // expression jest hoistowane, 
    // ale nie inicjalizowane, bedzue undefined gdy zawolane
    // gdy fun jest umieszczone ponizej wywolania. TO samo co z var

    // w arrows tez dziala
    function foo(x=5) {
        return x+1;
    }
    expect(foo(6)).toBe(7);
    expect(foo()).toBe(6);
});

test('varargs - rest operator', () => {

    const foo = (...nums)=> {
        let sum = 0;
        for(const el of nums){
            sum+=el;
        }
        return sum;
    };
    expect(foo(1,2,3,4)).toBe(10);
    expect(foo(1,2,3)).toBe(6);

    
    const foo2 = (x, ...nums) =>  nums.reduce((a,b) => a+b) * x;

    expect(foo2(0,2,3,4)).toBe(0);
    expect(foo2(2, 1,2,3)).toBe(12);
});

test('varargs before rest operator', ()=> {
    // tylko funkcje, arrow nie!
    function foo() {
        let sum = 0;
        for(const el of arguments){
            sum += el;
        }
        return sum;
    }

    expect(foo(1,2,3,4)).toBe(10);
});

test('bind', ()=> {
    const foo = (a,b)=>{
        return a+b;
    };

    // bindujemy argument, preconfigured function. moze byc czesc argumentow albo wszystkie
    const newFoo = foo.bind(this, 1,2);
    expect(newFoo()).toBe(3);

    const barz = foo.bind(this, 1);
    expect(barz(3)).toBe(4);

});