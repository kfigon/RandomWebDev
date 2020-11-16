"use strict";
var Action;
(function (Action) {
    Action[Action["FOO"] = 0] = "FOO";
})(Action || (Action = {}));
function update(state, action) {
    return state;
}
function view(dispatch, state) {
    var div = document.createElement('div');
    div.innerText = 'hello!';
    var but = document.createElement('button');
    but.innerText = 'click me';
    but.addEventListener('click', function () { return dispatch(Action.FOO); });
    div.appendChild(but);
    return div;
}
function app() {
    var app = document.getElementById('app');
    if (!app) {
        alert('no app');
        throw new Error("no app");
    }
    var state = {};
    var viewNode = view(dispatch, state);
    app.appendChild(viewNode);
    function dispatch(action) {
        console.log('updating app');
        state = update(state, action);
        var updatedView = view(dispatch, state);
        if (!app)
            return;
        app.replaceChild(updatedView, viewNode);
        viewNode = updatedView;
    }
}
app();
