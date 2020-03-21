test('reflect', ()=>{
    const foo = {
        title: 'barz',
        value: 123
    };

    Reflect.setPrototypeOf(foo, {
        toString() {
            return `${this.title} of ${this.value}`;
        }
    });
    // same as operating on properties etc with nicer API
    
    // Reflect.defineProperty
    // Reflect.ownKeys
    expect(foo.toString()).toBe('barz of 123');
});