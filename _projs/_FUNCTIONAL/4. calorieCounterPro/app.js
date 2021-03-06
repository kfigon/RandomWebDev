"use strict";
var Mode;
(function (Mode) {
    Mode[Mode["VIEW"] = 0] = "VIEW";
    Mode[Mode["ADD"] = 1] = "ADD";
    Mode[Mode["EDIT"] = 2] = "EDIT";
})(Mode || (Mode = {}));
var Action;
(function (Action) {
    Action[Action["SHOW_EDIT_FORM"] = 0] = "SHOW_EDIT_FORM";
    Action[Action["SHOW_ADD_FORM"] = 1] = "SHOW_ADD_FORM";
    Action[Action["HIDE_FORM"] = 2] = "HIDE_FORM";
    Action[Action["SAVE_NEW"] = 3] = "SAVE_NEW";
    Action[Action["SAVE_EDIT"] = 4] = "SAVE_EDIT";
    Action[Action["REMOVE"] = 5] = "REMOVE";
})(Action || (Action = {}));
function calculateTotal(meals) {
    return meals.map(function (m) { return m.calories; }).reduce(function (acc, m) { return acc + m; }, 0);
}
function handleNewMeal(state) {
    state.mode = Mode.ADD;
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}
function handleCancel(state) {
    state.mode = Mode.VIEW;
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}
function handleSaveNew(state) {
    if (state.pendingNewCalories !== null && state.pendingNewDescription !== null) {
        var newMeal = { id: state.nextNewId, name: state.pendingNewDescription, calories: state.pendingNewCalories };
        state.meals.push(newMeal);
        state.nextNewId++;
        state.mode = Mode.VIEW;
        state.pendingNewCalories = null;
        state.pendingNewDescription = null;
    }
    return state;
}
function handleSaveEdit(state) {
    if (state.editId !== null && state.pendingNewCalories !== null && state.pendingNewDescription !== null) {
        for (var _i = 0, _a = state.meals; _i < _a.length; _i++) {
            var meal = _a[_i];
            if (meal.id === state.editId) {
                meal.calories = state.pendingNewCalories;
                meal.name = state.pendingNewDescription;
            }
        }
        state.mode = Mode.VIEW;
        state.editId = null;
        state.pendingNewCalories = null;
        state.pendingNewDescription = null;
    }
    return state;
}
function handleShowAddForm(state) {
    state.mode = Mode.ADD;
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}
function handleShowEditForm(state) {
    state.mode = Mode.EDIT;
    return state;
}
function handleRemove(state) {
    var idToRemove = state.editId;
    state.meals = state.meals.filter(function (v) { return v.id !== idToRemove; });
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}
function handleAddText(state, text) {
    if (text === null)
        return state;
    state.pendingNewDescription = text;
    return state;
}
function handleAddNumber(state, text) {
    if (text === null)
        return state;
    var res = parseInt(text);
    var num = res === NaN ? 0 : res;
    state.pendingNewCalories = num;
    return state;
}
function handleFillDataForEdit(state, id) {
    state.editId = id;
    var meal = state.meals.filter(function (m) { return m.id === id; });
    if (meal.length === 0)
        return state;
    state.pendingNewCalories = meal[0].calories;
    state.pendingNewDescription = meal[0].name;
    return state;
}
function handleFillDataForRemove(state, id) {
    state.editId = id;
    return state;
}
function update(action, state) {
    switch (action) {
        case Action.SHOW_ADD_FORM: return handleShowAddForm(state);
        case Action.SHOW_EDIT_FORM: return handleShowEditForm(state);
        case Action.HIDE_FORM: return handleCancel(state);
        case Action.REMOVE: return handleRemove(state);
        case Action.SAVE_EDIT: return handleSaveEdit(state);
        case Action.SAVE_NEW: return handleSaveNew(state);
    }
    return state;
}
// ----------------------------- VIEW
function view(dispatchFunction, state) {
    var div = document.createElement('div');
    div.appendChild(h1('Calorie counting app'));
    var nullSafe = function (ev) { return (ev.target) ? ev.target.value : null; };
    if (state.mode === Mode.VIEW) {
        div.appendChild(button(function () { return dispatchFunction(Action.SHOW_ADD_FORM); }, 'Add meal'));
    }
    else {
        div.appendChild(input('Meal name: ', 'string', state.pendingNewDescription, function (ev) {
            state = handleAddText(state, nullSafe(ev));
        }));
        var getCalorie = function () { return state.pendingNewCalories === null ? '' : state.pendingNewCalories.toString(); };
        div.appendChild(input('Calories: ', 'number', getCalorie(), function (ev) {
            state = handleAddNumber(state, nullSafe(ev));
        }));
        if (state.mode === Mode.ADD) {
            div.appendChild(button(function () { return dispatchFunction(Action.SAVE_NEW); }, 'Save'));
        }
        else if (state.mode === Mode.EDIT) {
            div.appendChild(button(function () { return dispatchFunction(Action.SAVE_EDIT); }, 'Save'));
        }
        div.appendChild(button(function () { return dispatchFunction(Action.HIDE_FORM); }, 'Cancel'));
    }
    div.appendChild(table(dispatchFunction, state));
    return div;
}
function input(labelText, inputType, value, typedCallback) {
    var div = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = labelText;
    var inField = document.createElement('input');
    inField.inputMode = inputType;
    if (value !== null)
        inField.defaultValue = value;
    inField.addEventListener('input', typedCallback);
    div.appendChild(label);
    div.appendChild(inField);
    return div;
}
function button(callback, desc) {
    var but = document.createElement('button');
    but.addEventListener('click', callback);
    but.innerText = desc;
    return but;
}
function h1(desc) {
    var h = document.createElement('h1');
    h.innerText = desc;
    return h;
}
function table(dispatchFunction, state) {
    var tab = document.createElement('table');
    tab.appendChild(createTableHead(['Meal', 'Calories', 'Actions']));
    tab.appendChild(createTableBody(dispatchFunction, state));
    tab.appendChild(createTableFooter(calculateTotal(state.meals)));
    return tab;
}
function createTableHead(colums) {
    var head = document.createElement('thead');
    var row = document.createElement('tr');
    head.appendChild(row);
    colums
        .map(function (el) { return th(el); })
        .forEach(function (el) { return row.appendChild(el); });
    return head;
}
function createTableFooter(totalCals) {
    var head = document.createElement('tfoot');
    var row = document.createElement('tr');
    head.appendChild(row);
    row.appendChild(th('Total calories:'));
    row.appendChild(th(totalCals.toString()));
    row.appendChild(th(''));
    return head;
}
function th(text) {
    var th = document.createElement('th');
    th.innerText = text;
    return th;
}
function createTableBody(dispatchFunction, state) {
    var body = document.createElement('tbody');
    var thButtons = function (but1, but2) {
        var th = document.createElement('th');
        th.appendChild(but1);
        th.appendChild(but2);
        return th;
    };
    var bt1 = function (id) { return function () {
        return button(function () {
            state = handleFillDataForEdit(state, id);
            dispatchFunction(Action.SHOW_EDIT_FORM);
        }, 'Edit');
    }; };
    var bt2 = function (id) { return function () {
        return button(function () {
            state = handleFillDataForRemove(state, id);
            dispatchFunction(Action.REMOVE);
        }, 'Remove');
    }; };
    state.meals
        .map(function (el) {
        var row = document.createElement('tr');
        row.appendChild(th(el.name));
        row.appendChild(th(el.calories.toString()));
        row.appendChild(thButtons(bt1(el.id)(), bt2(el.id)()));
        return row;
    })
        .forEach(function (row) { return body.appendChild(row); });
    return body;
}
// ----------------- APP
function app() {
    var ap = document.getElementById('app');
    if (!ap) {
        alert('no app');
        throw new Error('no app');
    }
    var meals = [
        { id: 0, name: 'Breakfast', calories: 300 },
        { id: 1, name: 'Dinner', calories: 600 },
        { id: 2, name: 'Supper', calories: 400 }
    ];
    var initState = {
        meals: meals,
        mode: Mode.VIEW,
        editId: null,
        pendingNewCalories: null,
        pendingNewDescription: null,
        nextNewId: meals.length
    };
    var currentModel = initState;
    var currentView = view(updateView, initState);
    ap.appendChild(currentView);
    function updateView(action) {
        // console.log("PRE");
        // console.log(JSON.stringify(currentModel));
        currentModel = update(action, currentModel);
        // console.log("POST");
        // console.log(JSON.stringify(currentModel));
        var updatedView = view(updateView, currentModel);
        if (!ap)
            return;
        ap.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
}
app();
