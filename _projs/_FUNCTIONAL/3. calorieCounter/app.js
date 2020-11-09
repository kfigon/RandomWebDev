"use strict";
var Operation;
(function (Operation) {
    Operation[Operation["Add"] = 0] = "Add";
    Operation[Operation["Remove"] = 1] = "Remove";
})(Operation || (Operation = {}));
function readData() {
    var nameNode = document.getElementById('input-name');
    var caloriesNode = document.getElementById('input-calories');
    if (!nameNode || !nameNode.value || !caloriesNode || !caloriesNode.value)
        return null;
    return { name: nameNode.value, calories: parseInt(caloriesNode.value) };
}
function createView(meals, dispatch) {
    var node = document.createElement('div');
    node.appendChild(createInputView('input-name'));
    node.appendChild(createInputView('input-calories'));
    node.appendChild(createButton(function () { return dispatch(Operation.Add); }, 'Add'));
    node.appendChild(createMealsView(meals, dispatch));
    return node;
}
function createInputView(id) {
    var node = document.createElement('input');
    node.id = id;
    return node;
}
function createMealsView(meals, callback) {
    var node = document.createElement('ul');
    meals
        .map(function (m) {
        var el = document.createElement('li');
        el.innerText = m.name + " - " + m.calories;
        el.addEventListener('click', function () { return callback(Operation.Remove, m); });
        return el;
    })
        .forEach(function (m) { return node.appendChild(m); });
    node.appendChild(createSummaryView(meals));
    return node;
}
function createSummaryView(meals) {
    var node = document.createElement('li');
    var sum = meals
        .map(function (m) { return m.calories; })
        .reduce(function (acc, v) { return acc + v; }, 0);
    node.innerText = "Summary: " + sum;
    return node;
}
function createButton(callback, text) {
    var node = document.createElement('button');
    node.addEventListener('click', callback);
    node.innerText = text;
    return node;
}
function addNewMeal(meals, newMeal) {
    if (!newMeal)
        return meals;
    meals.push(newMeal);
    return meals;
}
function removeMeal(meals, mealToRemove) {
    if (!mealToRemove)
        return meals;
    meals = meals.filter(function (m) { return m.calories !== mealToRemove.calories || m.name !== mealToRemove.name; });
    return meals;
}
function runApp() {
    var app = document.getElementById('app');
    if (!app) {
        alert("NO APP");
        throw new Error("NO APP");
    }
    var currentModel = [];
    var currentView = createView(currentModel, dispatch);
    app.appendChild(currentView);
    function dispatch(operation, clickedElement) {
        if (operation === Operation.Add) {
            var newMeal = readData();
            currentModel = addNewMeal(currentModel, newMeal);
        }
        else if (operation === Operation.Remove) {
            console.log('clicked remove ' + clickedElement);
            var mealToRemove = clickedElement;
            currentModel = removeMeal(currentModel, mealToRemove);
        }
        var updatedView = createView(currentModel, dispatch);
        if (!app)
            return;
        app.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
}
runApp();
