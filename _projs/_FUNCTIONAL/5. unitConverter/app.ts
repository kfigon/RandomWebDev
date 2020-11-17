interface State {
    from: Unit;
    to: Unit;
    sourceValue: number | null;
    targetValue: number | null;
}

enum Unit { Celcius = 'Celcius', Fahrenheit = 'Fahrenheit', Kelvin = 'Kelvin' }

function getAllUnits(): Unit[] {
    return [Unit.Celcius, Unit.Fahrenheit, Unit.Kelvin];
}

function celcToFahr(val: number): number { return (val * 9 / 5) + 35; }
function fahrToCelc(val: number): number { return (val - 32) * 5 / 9; }

function celToKelv(val: number): number { return val + 273.15 }
function kelvToCel(val: number): number { return val - 273.15 }

function fahrToKel(val: number): number { return celToKelv(fahrToCelc(val)); }
function kelToFahr(val: number): number { return celcToFahr(kelvToCel(val)); }

function update(state: State): State {
    const { from, to } = state;

    const mapper = new Map<Unit, Map<Unit, Function>>([
        [Unit.Celcius, new Map<Unit, Function>([
            [Unit.Fahrenheit, celcToFahr],
            [Unit.Kelvin, celToKelv]])],
        [Unit.Fahrenheit, new Map<Unit, Function>([
            [Unit.Celcius, fahrToCelc],
            [Unit.Kelvin, fahrToKel]])],
        [Unit.Kelvin, new Map<Unit, Function>([
            [Unit.Celcius, kelvToCel],
            [Unit.Fahrenheit, kelToFahr]])]
    ]);

    const foo: Function | undefined = mapper.get(from)?.get(to);
    if (foo && state.sourceValue !== null) {
        state.targetValue = foo(state.sourceValue);
    } else {
        state.targetValue = state.sourceValue;
    }

    return state;
}

function toUnit(text: string): Unit | null {
    const ret = getAllUnits().filter(u => u.toString() === text);
    return ret.length === 0 ? null : ret[0];
}

function view(dispatch: Function, state: State): HTMLElement {
    const divMain = document.createElement('div');

    const div1 = document.createElement('div');
    const lab1 = document.createElement('label');
    lab1.innerText = 'input';
    div1.appendChild(lab1);
    div1.appendChild(input(state.sourceValue,
        (ev: Event) => {
            state.sourceValue = ev.target.value;
        }));

    div1.appendChild(combobox(getAllUnits(),
        state.from,
        (ev: Event) => {
            // not an error!
            const selected = toUnit(ev.target.value);
            if (selected) {
                state.from = selected;
                dispatch();
            }
        }
    ));

    const div2 = document.createElement('div');
    const lab2 = document.createElement('label');
    lab2.innerText = 'result';
    div2.appendChild(lab2);
    div2.appendChild(input(state.targetValue,
        (ev: Event) => {
            state.targetValue = ev.target.value;
        }));

    div2.appendChild(combobox(getAllUnits(),
        state.to,
        (ev: Event) => {
            const selected = toUnit(ev.target.value);
            if (selected) {
                state.to = selected;
                dispatch();
            }
        }
    ));

    divMain.appendChild(div1);
    divMain.appendChild(div2);
    return divMain;
}

function combobox(values: Unit[], selectedValue: Unit, inputCallback: any): HTMLSelectElement {
    const sel = document.createElement('select');
    sel.addEventListener('change', inputCallback);

    const createOption = (val: Unit) => {
        const o = document.createElement('option');
        o.value = val.toString();
        o.innerText = val.toString();
        if (val === selectedValue) {
            o.selected = true;
        }
        return o;
    }

    values
        .map(v => createOption(v))
        .forEach(v => sel.appendChild(v));

    return sel;
}

function input(value: number | null, inputCallback: any): HTMLInputElement {
    const inp = document.createElement('input');
    inp.type = 'number';
    if (value !== null) {
        inp.defaultValue = value.toString();
    }

    inp.addEventListener('input', inputCallback);
    return inp;
}

function app() {
    const app: HTMLElement | null = document.getElementById('app');
    if (!app) {
        alert('no app');
        throw new Error("no app");
    }

    let state: State = {
        from: Unit.Celcius,
        to: Unit.Fahrenheit,
        sourceValue: 0,
        targetValue: 0,
    }

    let viewNode = view(dispatch, state);
    app.appendChild(viewNode);

    function dispatch() {
        state = update(state);
        const updatedView = view(dispatch, state);
        if (!app) return;

        app.replaceChild(updatedView, viewNode);
        viewNode = updatedView;
    }
}

app();