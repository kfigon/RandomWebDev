"use strict";
var Operation;
(function (Operation) {
    Operation[Operation["PLUS"] = 0] = "PLUS";
    Operation[Operation["MINUS"] = 1] = "MINUS";
    Operation[Operation["RESET"] = 2] = "RESET";
})(Operation || (Operation = {}));
function update(operation, model) {
    switch (operation) {
        case Operation.PLUS: return model + 1;
        case Operation.MINUS: return model - 1;
        case Operation.RESET: return 0;
    }
    return model;
}
function view(dispatch, model) {
    var node = document.createElement('div');
    var textField = document.createElement('p');
    textField.innerText = "Count: " + model;
    node.appendChild(textField);
    node.appendChild(createButton(function () { return dispatch(Operation.PLUS); }, '+'));
    node.appendChild(createButton(function () { return dispatch(Operation.MINUS); }, '-'));
    node.appendChild(createButton(function () { return dispatch(Operation.RESET); }, 'C'));
    return node;
}
function createButton(callback, text) {
    var button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', callback);
    return button;
}
// impure code below
function app(initModel, appNode) {
    // controller
    function dispatch(operation) {
        model = update(operation, model);
        var updatedView = view(dispatch, model);
        appNode.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
    // model
    var model = initModel;
    var currentView = view(dispatch, model); // view
    appNode.appendChild(currentView);
}
var appNode = document.getElementById('app');
if (!appNode) {
    alert("ERROR!");
    throw new Error("ERROR, no app");
}
app(0, appNode);
