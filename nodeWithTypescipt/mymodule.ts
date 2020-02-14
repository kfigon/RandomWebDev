function foo(num: number) : string {
    let out : string = '';
    for(let i =0; i<num; i++) {
        out+='!';
    }
    return out;
}

export = foo;