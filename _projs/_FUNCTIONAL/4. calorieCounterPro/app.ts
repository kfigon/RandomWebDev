// ----------------------------- MODEL
interface Meal {
    id: number;
    name: string;
    calories: number;
}

enum Mode {
    VIEW, ADD, EDIT
}

interface State {
    meals: Meal[];

    pendingNewDescription: string | null;
    pendingNewCalories: number | null;

    mode: Mode;
    editId: number | null;
    nextNewId: number;
}

function calculateTotal(meals: Meal[]): number {
    return meals.map(m => m.calories).reduce((acc, m) => acc + m, 0);
}

function updateDescription(state: State, newInput: string): State {
    state.pendingNewDescription = newInput;
    return state;
}

function updateCalories(state: State, newCalories: number): State {
    state.pendingNewCalories = newCalories;
    return state;
}

function handleNewMeal(state: State): State {
    state.mode = Mode.ADD;
    return state;
}

function handleCancel(state: State): State {
    state.mode = Mode.VIEW;
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}

function handleSaveNew(state: State): State {
    if (state.pendingNewCalories !== null && state.pendingNewDescription !== null) {
        const newMeal: Meal = { id: state.nextNewId, name: state.pendingNewDescription, calories: state.pendingNewCalories };
        state.meals.push(newMeal);
        state.nextNewId++;

        state.mode = Mode.VIEW;
        state.pendingNewCalories = null;
        state.pendingNewDescription = null;
    }

    return state;
}

function handleSaveEdit(state: State): State {

    if (state.editId !== null && state.pendingNewCalories !== null && state.pendingNewDescription !== null) {
        
        for (const meal of state.meals) {
            if (meal.id === state.editId) {
                meal.calories = state.pendingNewCalories;
                meal.name = state.pendingNewDescription
            }
        }

        state.mode = Mode.VIEW;
        state.editId = null;
        state.pendingNewCalories = null;
        state.pendingNewDescription = null;
    }

    return state;
}

function handleRemove(state: State, idToRemove: number): State {
    state.meals = state.meals.filter((v, idx) => idx !== idToRemove);
    return state;
}

// ----------------------------- VIEW

function view(state: State): HTMLElement {
    const div = document.createElement('div');
    div.appendChild(h1('Calorie counting app'));

    if (state.mode === Mode.VIEW) {
        div.appendChild(button(() => console.log('todo'), 'Add meal'));
    } else if (state.mode === Mode.ADD) {
        div.appendChild(input('Meal name: ', 'string'));
        div.appendChild(input('Calories: ', 'number'));
        div.appendChild(button(() => console.log("todo"), 'Add Meal'));
        div.appendChild(button(() => console.log("todo"), 'Cancel'));

    } else if (state.mode === Mode.EDIT) {
        div.appendChild(input('Meal name: ', 'string'));
        div.appendChild(input('Calories: ', 'number'));
        div.appendChild(button(() => console.log("todo"), 'Edit Meal'));
        div.appendChild(button(() => console.log("todo"), 'Cancel'));
    }

    div.appendChild(table(state.meals));
    return div;
}

function input(labelText: string, inputType: string): HTMLElement {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.innerText = labelText;

    const inField = document.createElement('input');
    inField.inputMode = inputType;

    div.appendChild(label);
    div.appendChild(inField);
    return div;
}

function button(callback: any, desc: string): HTMLButtonElement {
    const but = document.createElement('button');
    but.addEventListener('click', callback);
    but.innerText = desc;
    return but;
}

function h1(desc: string): HTMLElement {
    const h = document.createElement('h1');
    h.innerText = desc;
    return h;
}

function table(meals: Meal[]): HTMLTableElement {
    const tab = document.createElement('table');
    tab.appendChild(createTableHead(['Meal', 'Calories', 'Actions']))
    tab.appendChild(createTableBody(meals))
    tab.appendChild(createTableFooter(calculateTotal(meals)));
    return tab;
}

function createTableHead(colums: string[]): HTMLElement {
    const head = document.createElement('thead');
    const row = document.createElement('tr');
    head.appendChild(row);

    colums
        .map(el => th(el))
        .forEach(el => row.appendChild(el));

    return head;
}

function createTableFooter(totalCals: number): HTMLElement {
    const head = document.createElement('tfoot');
    const row = document.createElement('tr');
    head.appendChild(row);

    row.appendChild(th('Total calories:'));
    row.appendChild(th(totalCals.toString()));
    row.appendChild(th(''));

    return head;
}

function th(text: string): HTMLElement {
    const th = document.createElement('th')
    th.innerText = text;
    return th;
}

function createTableBody(meals: Meal[]): HTMLElement {
    const body = document.createElement('tbody');

    meals
        .map(el => {
            const row = document.createElement('tr');
            row.appendChild(th(el.name));
            row.appendChild(th(el.calories.toString()));
            row.appendChild(th('buttons todo'));
            return row;
        })
        .forEach(row => body.appendChild(row));
    return body;
}

// ----------------- APP

function app() {
    const ap = document.getElementById('app');
    if (!ap) {
        alert('no app');
        throw new Error('no app');
    }

    const meals: Meal[] = [
        { id: 0, name: 'Breakfast', calories: 300 },
        { id: 1, name: 'Dinner', calories: 600 },
        { id: 2, name: 'Supper', calories: 400 }];

    const initState: State = {
        meals: meals,
        mode: Mode.ADD,
        editId: null,
        pendingNewCalories: null,
        pendingNewDescription: null,
        nextNewId: meals.length
    }

    ap.appendChild(view(initState));
}

app();