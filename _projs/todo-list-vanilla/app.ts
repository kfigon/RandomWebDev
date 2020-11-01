class Tasks {
    tasks: Array<string>;
    constructor() {
        this.tasks = [];
    }
    addTask(task: string) {
        this.tasks.push(task);
    }
    removeTask(task: string) {
        this.tasks = this.tasks.filter((el) => task !== el);
    }
}
let tasks = new Tasks();

function init() {
    document.getElementById('add-task')?.addEventListener('click', handleNewTask);

    ['add insert to list on enter',
        'styling',
        'mark as done'].forEach(t => addTask(t));
}

function handleNewTask() {
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
        nodeToRemove =  nodeToRemove.nextSibling;
    }
    
    if(nodeToRemove){
        list.removeChild(nodeToRemove);
    }
}

function addTask(newTask: string) {
    const list: HTMLElement | null = document.getElementById('tasks');

    if (!list) return;

    tasks.addTask(newTask);

    const newNode = document.createElement('li');
    newNode.textContent = newTask;
    newNode.addEventListener('click', () => clearTask(newTask));
    list.appendChild(newNode);
}

init();