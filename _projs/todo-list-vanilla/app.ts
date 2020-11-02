class Tasks {
    tasks: Array<string>;
    constructor() {
        this.tasks = [];
    }
    addTask(task: string): boolean {
        if (this.tasks.indexOf(task) === -1) {
            this.tasks.push(task);
            return true
        }
        return false;
    }
    removeTask(task: string) {
        this.tasks = this.tasks.filter((el) => task !== el);
    }
}
let tasks = new Tasks();

function init() {
    document.getElementById('task-name')?.addEventListener('keydown', handleNewTask);

    ['styling',
        'mark as done'].forEach(t => addTask(t));
}

function handleNewTask(e: any) {
    if (e.key !== 'Enter') {
        return
    }
    const inputElement: HTMLInputElement | null = <HTMLInputElement>document.getElementById('task-name');
    if (!inputElement || !inputElement.value) return;

    const list: HTMLElement | null = document.getElementById('tasks');
    if (!list) return;

    addTask(inputElement.value);
    inputElement.value = '';
}

function clearTask(task: string) {
    const list: HTMLElement | null = document.getElementById('tasks');
    if (!list) return;

    tasks.removeTask(task);

    let nodeToRemove = list.firstChild;
    while (nodeToRemove && nodeToRemove.textContent !== task) {
        nodeToRemove = nodeToRemove.nextSibling;
    }

    if (nodeToRemove) list.removeChild(nodeToRemove);
}

function addTask(newTask: string) {
    const list: HTMLElement | null = document.getElementById('tasks');

    if (!list) return;

    if(!tasks.addTask(newTask)) return;

    const newNode = document.createElement('li');
    newNode.textContent = newTask;
    newNode.addEventListener('click', () => clearTask(newTask));
    list.appendChild(newNode);
}

init();