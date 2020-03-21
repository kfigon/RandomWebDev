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
    // Reflect.defineProperty
    // Reflect.ownKeys
    expect(foo.toString()).toBe('barz of 123');
});