"use strict";
var Tasks = /** @class */ (function () {
    function Tasks() {
        this.tasks = [];
    }
    Tasks.prototype.addTask = function (task) {
        if (this.tasks.indexOf(task) === -1) {
            this.tasks.push(task);
            return true;
        }
        return false;
    };
    Tasks.prototype.removeTask = function (task) {
        this.tasks = this.tasks.filter(function (el) { return task !== el; });
    };
    return Tasks;
}());
var tasks = new Tasks();
function init() {
    var _a;
    (_a = document.getElementById('task-name')) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', handleNewTask);
    ['Some',
        'Things to do!'].forEach(function (t) { return addTask(t); });
}
function handleNewTask(e) {
    if (e.key !== 'Enter') {
        return;
    }
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
    if (nodeToRemove)
        list.removeChild(nodeToRemove);
}
function addTask(newTask) {
    var list = document.getElementById('tasks');
    if (!list)
        return;
    if (!tasks.addTask(newTask))
        return;
    var newNode = document.createElement('li');
    newNode.textContent = newTask;
    newNode.addEventListener('click', function () { return clearTask(newTask); });
    list.appendChild(newNode);
}
init();
