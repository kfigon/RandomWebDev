"use strict";
var Tasks = /** @class */ (function () {
    function Tasks() {
        this.tasks = [];
    }
    Tasks.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    Tasks.prototype.removeTask = function (task) {
        this.tasks = this.tasks.filter(function (el) { return task !== el; });
    };
    return Tasks;
}());
var tasks = new Tasks();
function init() {
    var _a;
    (_a = document.getElementById('add-task')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleNewTask);
    ['add insert to list on enter',
        'styling',
        'mark as done'].forEach(function (t) { return addTask(t); });
}
function handleNewTask() {
    var inputElement = document.getElementById('task-name');
    if (!inputElement || !inputElement.value)
        return;
    var list = document.getElementById('tasks');
    if (!list)
        return;
    addTask(inputElement.value);
    inputElement.value = '';
}
function clearTask(task) {
    var list = document.getElementById('tasks');
    if (!list)
        return;
    tasks.removeTask(task);
    var nodeToRemove = list.firstChild;
    while (nodeToRemove && nodeToRemove.textContent !== task) {
        nodeToRemove = nodeToRemove.nextSibling;
    }
    if (nodeToRemove) {
        list.removeChild(nodeToRemove);
    }
}
function addTask(newTask) {
    var list = document.getElementById('tasks');
    if (!list)
        return;
    tasks.addTask(newTask);
    var newNode = document.createElement('li');
    newNode.textContent = newTask;
    newNode.addEventListener('click', function () { return clearTask(newTask); });
    list.appendChild(newNode);
}
init();
