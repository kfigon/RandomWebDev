"use strict";
var Unit;
(function (Unit) {
    Unit["Celcius"] = "Celcius";
    Unit["Fahrenheit"] = "Fahrenheit";
    Unit["Kelvin"] = "Kelvin";
})(Unit || (Unit = {}));
function celcToFahr(val) { return (val * 9 / 5) + 35; }
function fahrToCelc(val) { return (val - 32) * 5 / 9; }
function celToKelv(val) { return val + 273.15; }
function kelvToCel(val) { return val - 273.15; }
function fahrToKel(val) { return celToKelv(fahrToCelc(val)); }
function kelToFahr(val) { return celcToFahr(kelvToCel(val)); }
function update(state) {
    var _a;
    const { from, to } = state;
    const mapper = new Map([
        [Unit.Celcius, new Map([
                [Unit.Fahrenheit, celcToFahr],
                [Unit.Kelvin, celToKelv]
            ])],
        [Unit.Fahrenheit, new Map([
                [Unit.Celcius, fahrToCelc],
                [Unit.Kelvin, fahrToKel]
            ])],
        [Unit.Kelvin, new Map([
                [Unit.Celcius, kelvToCel],
                [Unit.Fahrenheit, kelToFahr]
            ])]
    ]);
    const foo = (_a = mapper.get(from)) === null || _a === void 0 ? void 0 : _a.get(to);
    if (foo && state.sourceValue !== null) {
        state.targetValue = foo(state.sourceValue);
    }
    return state;
}
function view(dispatch, state) {
    const div = document.createElement('div');
    div.appendChild(input(1, (ev) => {
        console.log('typed');
        dispatch();
    }));
    div.appendChild(combobox([Unit.Celcius, Unit.Fahrenheit, Unit.Kelvin], (ev) => {
        if (ev && ev.target) {
            // not an error!
            console.log(ev.target.value);
            dispatch();
        }
    }));
    return div;
}
function combobox(values, inputCallback) {
    const sel = document.createElement('select');
    sel.addEventListener('change', inputCallback);
    const createOption = (val) => {
        const o = document.createElement('option');
        o.value = val.toString();
        o.innerText = val.toString();
        return o;
    };
    values
        .map(v => createOption(v))
        .forEach(v => sel.appendChild(v));
    return sel;
}
function input(value, inputCallback) {
    const inp = document.createElement('input');
    if (value !== null) {
        inp.defaultValue = value.toString();
    }
    inp.addEventListener('input', inputCallback);
    return inp;
}
function app() {
    const app = document.getElementById('app');
    if (!app) {
        alert('no app');
        throw new Error("no app");
    }
    let state = {
        from: Unit.Celcius,
        to: Unit.Celcius,
        sourceValue: 0,
        targetValue: 0,
    };
    let viewNode = view(dispatch, state);
    app.appendChild(viewNode);
    function dispatch() {
        state = update(state);
        const updatedView = view(dispatch, state);
        if (!app)
            return;
        app.replaceChild(updatedView, viewNode);
        viewNode = updatedView;
    }
}
app();
