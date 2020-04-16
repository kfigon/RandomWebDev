import myfoo from '../app';

test('foo', ()=>{
    expect(myfoo(3)).toBe('hello 3');
});