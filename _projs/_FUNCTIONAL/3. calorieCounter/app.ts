enum Operation {
    Add, Remove
}
interface Meal {
    name: string;
    calories: number;
}

function readData(): Meal | null {
    const nameNode = <HTMLInputElement>document.getElementById('input-name');
    const caloriesNode = <HTMLInputElement>document.getElementById('input-calories');
    if (!nameNode || !nameNode.value || !caloriesNode || !caloriesNode.value) return null;

    return { name: nameNode.value, calories: parseInt(caloriesNode.value) };
}

function createView(meals: Meal[], dispatch: Function): HTMLElement {
    const node = document.createElement('div');

    node.appendChild(createInputView('input-name'));
    node.appendChild(createInputView('input-calories'));
    node.appendChild(createButton(() => dispatch(Operation.Add), 'Add'));
    node.appendChild(createMealsView(meals));

    return node;
}

function createInputView(id: string): HTMLElement {
    const node = document.createElement('input');
    node.id = id;
    return node;
}

function createMealsView(meals: Meal[]): HTMLUListElement {
    const node = document.createElement('ul');
    meals
        .map(m => `${m.name} - ${m.calories}`)
        .map(m => {
            const el = document.createElement('li');
            el.innerText = m;
            return el;
        })
        .forEach(m => node.appendChild(m));

    node.appendChild(createSummaryView(meals));
    return node;
}

function createSummaryView(meals: Meal[]): HTMLLIElement {
    const node = document.createElement('li');
    const sum = meals
        .map(m => m.calories)
        .reduce((acc, v) => acc + v, 0);

    node.innerText = `Summary: ${sum}`;
    return node;
}

function createButton(callback: any, text: string): HTMLButtonElement {
    const node = document.createElement('button');
    node.addEventListener('click', callback);
    node.innerText = text;
    return node;
}

function addNewMeal(meals: Meal[], newMeal: Meal | null): Meal[] {
    if (!newMeal) return meals;

    meals.push(newMeal);
    return meals;
}
function removeMeal(meals: Meal[], mealToRemove: Meal | null): Meal[] {
    if(!mealToRemove) return meals;

    meals = meals.filter(m => m.calories === mealToRemove.calories && m.name===mealToRemove.name);
    return meals;
}

function runApp() {

    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        alert("NO APP");
        throw new Error("NO APP");
    }

    let currentModel: Meal[] = [];
    let currentView = createView(currentModel, dispatch)
    app.appendChild(currentView);


    function dispatch(operation: Operation) {
        if (operation === Operation.Add) {
            const newMeal = readData();
            currentModel = addNewMeal(currentModel, newMeal);
        } else if(operation === Operation.Remove) {
            const mealToRemove = null; // todo: handle!
            currentModel = removeMeal(currentModel, mealToRemove);
        }
        
        const updatedView = createView(currentModel, dispatch);
        if (!app) return;
        app.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
}

runApp();