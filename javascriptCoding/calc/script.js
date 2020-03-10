function setResult(value) {
    const result = document.getElementById('result');
    result.placeholder = value;
}

function performOperation(foo) {
    const first = document.getElementById('first-operand').value;
    const second = document.getElementById('second-operand').value;
    if(second && first) {
        // conversion string->int
        // let foo = '43';
        // let num = +foo
        setResult(foo(parseInt(first), parseInt(second)));
    }
}

function add() {
    performOperation((a,b) => a+b);
}

function minus() {
    performOperation((a,b) => a-b);
}

function mult() {
    performOperation((a,b) => a*b);
}

function div() {
    performOperation((a,b) => (a/b).toFixed(2));
}