enum Operation {
    PLUS, MINUS, RESET
}


function update(operation: Operation, model: number): number {
    switch (operation) {
        case Operation.PLUS: return model + 1;
        case Operation.MINUS: return model - 1;
        case Operation.RESET: return 0;
    }
    return model;
}

function view(dispatch: Function, model: number): HTMLElement {
    const node = document.createElement('div');
    const textField = document.createElement('p');

    textField.innerText = `Count: ${model}`;

    node.appendChild(textField);

    node.appendChild(createButton(() => dispatch(Operation.PLUS), '+'));
    node.appendChild(createButton(() => dispatch(Operation.MINUS), '-'));
    node.appendChild(createButton(() => dispatch(Operation.RESET), 'C'));

    return node;
}

function createButton(callback: any, text: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', callback);
    return button;
}

// impure code below

function app(initModel: number, appNode: HTMLElement) {
    // controller
    function dispatch(operation: Operation) {
        model = update(operation, model);
        const updatedView = view(dispatch, model);
        appNode.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }

    // model
    let model = initModel;
    let currentView = view(dispatch, model); // view
    appNode.appendChild(currentView);
}

const appNode = document.getElementById('app');
if (!appNode) {
    alert("ERROR!");
    throw new Error("ERROR, no app");
}
app(0, appNode);
