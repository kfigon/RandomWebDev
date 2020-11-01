"use strict";
function addTask() {
    var task = readTask();
    if (task)
        addElement(task);
}
function addElement(name) {
    if (!name) {
        return;
    }
    var el = document.getElementById('tasks');
    if (!el) {
        return;
    }
    var newChild = document.createElement('li');
    newChild.textContent = name;
    newChild.addEventListener('click', function () { return markTask(newChild); });
    el.appendChild(newChild);
}
function markTask(foo) {
    console.log(foo);
    foo.classList.toggle('strk');
}
function readTask() {
    var el = document.getElementById('task-name');
    if (!el || !el.value) {
        console.log('not found');
        return null;
    }
    var toRet = el.value;
    el.value = '';
    return toRet;
}
