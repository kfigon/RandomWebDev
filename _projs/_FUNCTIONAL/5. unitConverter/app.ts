interface State {
    from: Unit;
    to: Unit;
    sourceValue: number | null;
    targetValue: number | null;
}

enum Unit { Celcius = 'Celcius', Fahrenheit = 'Fahrenheit', Kelvin = 'Kelvin' }

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
    }

    return state;
}

function view(dispatch: Function, state: State): HTMLElement {
    const div = document.createElement('div');

    div.appendChild(input(1,
        (ev: Event) => {
            console.log('typed')
            dispatch();
        }));

    div.appendChild(combobox([Unit.Celcius, Unit.Fahrenheit, Unit.Kelvin],
        (ev: Event) => {
            if (ev && ev.target) {
                // not an error!
                console.log(ev.target.value);
                dispatch();
            }

        }
    ));
    return div;
}

function combobox(values: Unit[], inputCallback: any): HTMLSelectElement {
    const sel = document.createElement('select');
    sel.addEventListener('change', inputCallback);

    const createOption = (val: Unit) => {
        const o = document.createElement('option');
        o.value = val.toString();
        o.innerText = val.toString();
        return o;
    }

    values
        .map(v => createOption(v))
        .forEach(v => sel.appendChild(v));

    return sel;
}

function input(value: number | null, inputCallback: any): HTMLInputElement {
    const inp = document.createElement('input');
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
        to: Unit.Celcius,
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