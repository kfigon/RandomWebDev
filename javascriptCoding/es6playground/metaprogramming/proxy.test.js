test('proxy', ()=>{
    const obj = {
        foo: function() {
            return 'asd';
        },
        someProperty : 'aaa'
    };

    const interceptor = {
        // this name is important
        get(theObject, propertyName) {
            return theObject[propertyName] + 'FOO';
        }
        // set(theObject, propertyName, newVal){}
    }

    const pr = new Proxy(obj, interceptor);

    expect(obj.someProperty).toBe('aaa');
    expect(pr.someProperty).toBe('aaaFOO');
});