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

    description: string;
    calories: number;

    mode: Mode;
    editId: number;
}

function calculateTotal(meals: Meal[]): number {
    return meals.map(m => m.calories).reduce((acc, m) => acc + m, 0);
}

// function view(state: State): HTMLElement {
//     if (state.mode === Mode.VIEW) {

//     }
// }

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
    ap.appendChild(table(meals));
}

app();