let foo :HTMLElement | null  = document.getElementById('asd');
if(foo){
    foo.innerText='asdasdasd';
}

let asd: string = 'fff';
console.log(asd);

console.log('more foo');
console.log('even more');


export default function myfoo(num: number) : string {
    return 'hello ' + num;
}