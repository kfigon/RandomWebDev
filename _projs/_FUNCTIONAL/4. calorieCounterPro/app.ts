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
}

function calculateTotal(meals: Meal[]): number {
    return meals.map(m => m.calories).reduce((acc, m) => acc + m, 0);
}

function view(state: State): HTMLElement {
    const div = document.createElement('div');
    div.appendChild(h1('Calorie counting app'));
    
    if (state.mode === Mode.VIEW) {
        div.appendChild(button(() => console.log('todo'), 'Add meal'));
    } else if(state.mode === Mode.ADD) {
        div.appendChild(input('Meal name: ', 'string'));
        div.appendChild(input('Calories: ', 'number'));
        div.appendChild(button(() => console.log("todo"), 'Add Meal'));
        div.appendChild(button(() => console.log("todo"), 'Cancel'));

    } else if(state.mode === Mode.EDIT) {
        div.appendChild(input('Meal name: ', 'string'));
        div.appendChild(input('Calories: ', 'number'));
        div.appendChild(button(() => console.log("todo"), 'Edit Meal'));
        div.appendChild(button(() => console.log("todo"), 'Cancel'));
    }

    div.appendChild(table(state.meals));
    return div;
}

function input(labelText: string, inputType: string) : HTMLElement {
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

function createTableHead(colums: string[]) : HTMLElement {
    const head = document.createElement('thead');
    const row = document.createElement('tr');
    head.appendChild(row);

    colums
        .map(el => th(el))
        .forEach(el => row.appendChild(el));

    return head;
}

function createTableFooter(totalCals: number) : HTMLElement {
    const head = document.createElement('tfoot');
    const row = document.createElement('tr');
    head.appendChild(row);

    row.appendChild(th('Total calories:'));
    row.appendChild(th(totalCals.toString()));
    row.appendChild(th(''));

    return head;
}

function th(text: string) : HTMLElement {
    const th = document.createElement('th')
    th.innerText = text;
    return th;
}

function createTableBody(meals: Meal[]) : HTMLElement {
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
    
    const state: State = {
        meals: meals,
        mode: Mode.ADD,
        editId: null,
        pendingNewCalories: null,
        pendingNewDescription: null
    }

    ap.appendChild(view(state));
}

app();