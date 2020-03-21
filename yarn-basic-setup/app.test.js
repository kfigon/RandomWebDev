const sum = require('./app');

test('foo', () =>{
    expect(sum(1,2)).toBe(3);
});