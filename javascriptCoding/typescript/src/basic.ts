// tsconfig.js for more configuration
export function sum (a: number, b: number) : number {
    return a+b;
}
function parse(a: number) : string {
    return a.toString();
}
function logIt(val: string) : void {
    console.log(val);
}

// specifing what we expect from some non ts function
// document.getElementById('asd') as HTMLInputElement
// <HTMLInputElement>document.getElementById('asd')

const res : number = sum(1,3);
const val = parse(res); // type infer
logIt(val);


