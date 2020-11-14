// ----------------------------- MODEL
interface Meal {
    id: number;
    name: string;
    calories: number;
}

enum Mode {
    VIEW, ADD, EDIT
}

enum Action {
    SHOW_EDIT_FORM,
    SHOW_ADD_FORM,
    HIDE_FORM,
    SAVE_NEW,
    SAVE_EDIT,
    STORE_DESCRIPTION,
    STORE_CALORIES,
    REMOVE
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

function handleShowAddForm(state: State): State {
    state.mode = Mode.ADD;
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}

function handleShowEditForm(state: State): State {
    state.mode = Mode.EDIT;
    state.editId = null;
    state.pendingNewCalories = null;
    state.pendingNewDescription = null;
    return state;
}

function handleRemove(state: State): State {
    const idToRemove = state.editId;
    state.meals = state.meals.filter((v, idx) => idx !== idToRemove);

    state.editId = null;
    return state;
}

function update(action: Action, state: State): State {
    switch (action) {
        case Action.SHOW_ADD_FORM: return handleShowAddForm(state);
        case Action.SHOW_EDIT_FORM: return handleShowEditForm(state);
        case Action.HIDE_FORM: return handleCancel(state);
        case Action.REMOVE: handleRemove(state);
        case Action.SAVE_EDIT: handleSaveEdit(state);
        case Action.SAVE_NEW: handleSaveNew(state);
    }
    return state;
}

// ----------------------------- VIEW

function view(dispatchFunction: Function, state: State): HTMLElement {
    const div = document.createElement('div');
    div.appendChild(h1('Calorie counting app'));

    if (state.mode === Mode.VIEW) {
        div.appendChild(button(() => dispatchFunction(Action.SHOW_ADD_FORM), 'Add meal'));
    } else if (state.mode === Mode.ADD) {
        
        // todo: is this a good way to save state?
        // make it proper update state function
        // key by key, fix it:(
        div.appendChild(input('Meal name: ', 'string', (ev: KeyboardEvent) =>{
            state.pendingNewDescription = ev.key;
            console.log(state.pendingNewDescription);

        }));
        div.appendChild(input('Calories: ', 'number',(ev: KeyboardEvent) =>{
                state.pendingNewCalories = parseInt(ev.key);
        }));
        div.appendChild(button(() => dispatchFunction(Action.SAVE_NEW), 'Save'));
        div.appendChild(button(() => dispatchFunction(Action.HIDE_FORM), 'Cancel'));

    } else if (state.mode === Mode.EDIT) {
        div.appendChild(input('Meal name: ', 'string', (ev: KeyboardEvent) =>{
            state.pendingNewDescription = ev.key;
            console.log(state.pendingNewDescription);
            
        }));
        div.appendChild(input('Calories: ', 'number',(ev: KeyboardEvent) =>{
                state.pendingNewCalories = parseInt(ev.key);
        }));
        div.appendChild(button(() => dispatchFunction(Action.SAVE_EDIT), 'Save'));
        div.appendChild(button(() => dispatchFunction(Action.HIDE_FORM), 'Cancel'));
    }

    div.appendChild(table(dispatchFunction, state));
    return div;
}

function input(labelText: string, inputType: string, typedCallback: any): HTMLElement {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.innerText = labelText;

    const inField = document.createElement('input');
    inField.inputMode = inputType;

    inField.addEventListener('keypress', typedCallback);

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

function table(dispatchFunction:Function, state: State): HTMLTableElement {
    const tab = document.createElement('table');
    tab.appendChild(createTableHead(['Meal', 'Calories', 'Actions']))
    tab.appendChild(createTableBody(dispatchFunction, state))
    tab.appendChild(createTableFooter(calculateTotal(state.meals)));
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

function createTableBody(dispatchFunction: Function, state: State): HTMLElement {
    const body = document.createElement('tbody');

    const thButtons = (but1: HTMLButtonElement, but2: HTMLButtonElement) => {
        const th = document.createElement('th')
        th.appendChild(but1);
        th.appendChild(but2);
        return th;
    }

    const bt1 = (id: number) => () =>  {
        state.editId = id;
        return button(() => dispatchFunction(Action.SHOW_EDIT_FORM), 'Edit');
    }

    const bt2 = (id: number) => () => {
        state.editId = id;
        return button(() => dispatchFunction(Action.REMOVE), 'Remove');
    }

    state.meals
        .map((el, idx) => {
            const row = document.createElement('tr');
            row.appendChild(th(el.name));
            row.appendChild(th(el.calories.toString()));
            row.appendChild(thButtons(bt1(idx)(), bt2(idx)()));
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
        mode: Mode.VIEW,
        editId: null,
        pendingNewCalories: null,
        pendingNewDescription: null,
        nextNewId: meals.length
    }

    let currentModel = initState;
    let currentView = view(updateView, initState)
    ap.appendChild(currentView);

    
    function updateView(action: Action) {
        currentModel = update(action, currentModel);
        let updatedView = view(updateView, currentModel);
        
        if(!ap) return;
        ap.replaceChild(updatedView, currentView);
        currentView = updatedView;
    }
}

app();