"use strict";
var Mode;
(function (Mode) {
    Mode[Mode["VIEW"] = 0] = "VIEW";
    Mode[Mode["ADD"] = 1] = "ADD";
    Mode[Mode["EDIT"] = 2] = "EDIT";
})(Mode || (Mode = {}));
function calculateTotal(meals) {
    return meals.map(function (m) { return m.calories; }).reduce(function (acc, m) { return acc + m; }, 0);
}
function view(state) {
    var div = document.createElement('div');
    div.appendChild(h1('Calorie counting app'));
    if (state.mode === Mode.VIEW) {
        div.appendChild(button(function () { return state = handleAddMealButton(state); }, 'Add meal'));
    }
    else if (state.mode === Mode.ADD) {
        div.appendChild(input('Meal name: ', 'string'));
        div.appendChild(input('Calories: ', 'number'));
        div.appendChild(button(function () { return console.log("todo"); }, 'Add Meal'));
    }
    else if (state.mode === Mode.EDIT) {
        div.appendChild(input('Meal name: ', 'string'));
        div.appendChild(input('Calories: ', 'number'));
        div.appendChild(button(function () { return console.log("todo"); }, 'Edit Meal'));
    }
    div.appendChild(table(state.meals));
    return div;
}
function handleAddMealButton(state) {
    state.mode = Mode.ADD;
    return state;
}
function input(labelText, inputType) {
    var div = document.createElement('div');
    var label = document.createElement('label');
    label.innerText = labelText;
    var inField = document.createElement('input');
    inField.inputMode = inputType;
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
function table(meals) {
    var tab = document.createElement('table');
    tab.appendChild(createTableHead(['Meal', 'Calories', 'Actions']));
    tab.appendChild(createTableBody(meals));
    tab.appendChild(createTableFooter(calculateTotal(meals)));
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
function createTableBody(meals) {
    var body = document.createElement('tbody');
    meals
        .map(function (el) {
        var row = document.createElement('tr');
        row.appendChild(th(el.name));
        row.appendChild(th(el.calories.toString()));
        row.appendChild(th('buttons todo'));
        return row;
    })
        .forEach(function (row) { return body.appendChild(row); });
    return body;
}
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
    var state = {
        meals: meals,
        mode: Mode.ADD,
        editId: null,
        pendingNewCalories: null,
        pendingNewDescription: null
    };
    ap.appendChild(view(state));
}
app();
