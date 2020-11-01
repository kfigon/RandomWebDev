let tasks: Array<string> = [
    'add insert to list on enter',
    'styling',
    'mark as done'
];

function init() {
    document.getElementById('add-task')?.addEventListener('click', handleOnclick);
    tasks.forEach(t => addTask(t))
}

function handleOnclick() {
    const inputElement: HTMLInputElement | null = <HTMLInputElement>document.getElementById('task-name');
    if(!inputElement || !inputElement.value) return;    
    
    const list: HTMLElement | null = document.getElementById('tasks');
    if(!list) return;
    
    addTask(inputElement.value);
    inputElement.value = '';
}
function clearTasks(task: string) {
    const list: HTMLElement | null = document.getElementById('tasks');
    if(!list) return;    

    tasks = tasks.filter((el) => task !== el);
    let nodeToRemove = list.firstChild;
    while(nodeToRemove?.textContent !== task) {
        nodeToRemove = nodeToRemove && nodeToRemove?.nextSibling;
    }
    list.removeChild(nodeToRemove);
}

function addTask(newTask: string) {
    const list: HTMLElement | null = document.getElementById('tasks');

    if(!list) return;
    tasks.push(newTask);
    
    const newNode = document.createElement('li');
    newNode.textContent = newTask;
    newNode.addEventListener('click', () => clearTasks(newTask));
    list.appendChild(newNode);
}

init();