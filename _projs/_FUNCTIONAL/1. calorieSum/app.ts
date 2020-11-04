interface Meal {
    name: string,
    calories: number
};

const MEALS: Array<Meal> = [
    { name: 'Breakfast', calories: 500 },
    { name: 'Lunch', calories: 800 },
    { name: 'Dinner', calories: 600 }
];

function tag(tagName: string, classNames: Array<string>, val: string): Node {
    const nodeElement = document.createElement(tagName);
    classNames.forEach(el => nodeElement.classList.add(el));
    nodeElement.innerText = val;
    return nodeElement;
}

const liStyled = (classNames: Array<string>): Function => {
    return (val:string): Node => tag('li', classNames, val);
}

function ul(): Node {
    return tag('ul', ['list'], '');
}

function li(val: string): Node {
    return liStyled(['item'])(val);
}

function mapToList(el: Meal): Node {
    return li(`${el.name} ---- ${el.calories}`);
}

function summaryNode(meals: Array<Meal>): Node {
    const sum = meals
        .map(v => v.calories)
        .reduce((a, b) => a + b, 0);
    return liStyled(['summary'])(`Summary: ${sum}`);
}

const items = MEALS.map(mapToList);
items.push(summaryNode(MEALS));

const list = ul();
items.forEach(el => list.appendChild(el));
document.getElementById('app')?.appendChild(list);