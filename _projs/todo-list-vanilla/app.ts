function addTask() {
    const task = readTask();
    if(task) addElement(task);
}

function addElement(name: string) {
    if(!name) {
        return;
    }

    const el: HTMLElement | null = document.getElementById('tasks');
    if(!el) {
        return;
    }

    const newChild: Element = document.createElement('li');
    newChild.textContent = name;
    newChild.addEventListener('click', () => markTask(newChild));
    el.appendChild(newChild);
}

function markTask(foo: Element) {
    console.log(foo);
    foo.classList.toggle('strk')
}

function readTask() : string | null {
    const el: HTMLInputElement | null = <HTMLInputElement>document.getElementById('task-name');

    if(!el || !el.value) {
        console.log('not found');
        return null;
    }

    const toRet = el.value;
    el.value = '';
    return toRet;
}