"use strict";
var tasks = [
    'add insert to list on enter',
    'styling',
    'mark as done'
];
function init() {
    var _a;
    (_a = document.getElementById('add-task')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleOnclick);
    tasks.forEach(function (t) { return addTask(t); });
}
function handleOnclick() {
    var inputElement = document.getElementById('task-name');
    if (!inputElement || !inputElement.value)
        return;
    var list = document.getElementById('tasks');
    if (!list)
        return;
    addTask(inputElement.value);
    inputElement.value = '';
}
function clearTasks(task) {
    var _a, _b;
    var list = document.getElementById('tasks');
    if (!list)
        return;
    tasks = tasks.filter(function (el) { return task !== el; });
    var nodeToRemove = list.firstChild;
    while (((_a = nodeToRemove) === null || _a === void 0 ? void 0 : _a.textContent) !== task) {
        nodeToRemove = nodeToRemove && ((_b = nodeToRemove) === null || _b === void 0 ? void 0 : _b.nextSibling);
    }
    list.removeChild(nodeToRemove);
}
function addTask(newTask) {
    var list = document.getElementById('tasks');
    if (!list)
        return;
    tasks.push(newTask);
    var newNode = document.createElement('li');
    newNode.textContent = newTask;
    newNode.addEventListener('click', function () { return clearTasks(newTask); });
    list.appendChild(newNode);
}
init();
