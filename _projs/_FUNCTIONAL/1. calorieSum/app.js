"use strict";
var _a;
;
var MEALS = [
    { name: 'Breakfast', calories: 500 },
    { name: 'Lunch', calories: 800 },
    { name: 'Dinner', calories: 600 }
];
function tag(tagName, classNames, val) {
    var nodeElement = document.createElement(tagName);
    classNames.forEach(function (el) { return nodeElement.classList.add(el); });
    nodeElement.innerText = val;
    return nodeElement;
}
function ul() {
    return tag('ul', ['list'], '');
}
function li(val) {
    return tag('li', ['item'], val);
}
function mapToList(el) {
    return li(el.name + " -> " + el.calories);
}
function summaryNode(meals) {
    var sum = meals
        .map(function (v) { return v.calories; })
        .reduce(function (a, b) { return a + b; }, 0);
    return li("Summary: " + sum);
}
var items = MEALS.map(mapToList);
items.push(summaryNode(MEALS));
var list = ul();
items.forEach(function (el) { return list.appendChild(el); });
(_a = document.getElementById('app')) === null || _a === void 0 ? void 0 : _a.appendChild(list);
