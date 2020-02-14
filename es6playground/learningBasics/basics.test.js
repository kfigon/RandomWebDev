// run with npm run test/npm test

test('for loop', () => {
    let sum = 0;
    for(let i=0; i<5; i++)
        sum+=i;

    expect(sum).toBe(10);
});

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

test('array', ()=>{
    let ar = [1,2,3,4,5];
    const another = ar.map((x)=> { return x*2; });
    
    expect(ar).toStrictEqual([1,2,3,4,5]);
    expect(another).toStrictEqual([2,4,6,8,10]);
});

test('for each', () => {
    const ar = [1,2,3,4,5];
    let s=0;
    for(let i of ar)
        s+=i;

    expect(s).toBe(15);
});

// testy parametryczne
for(let i=0; i<5; i++) {
    test('test '+i, () => {
        expect(i).toBe(i);
    });
}