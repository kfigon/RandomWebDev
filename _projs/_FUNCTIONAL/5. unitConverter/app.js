"use strict";
var Unit;
(function (Unit) {
    Unit["Celcius"] = "Celcius";
    Unit["Fahrenheit"] = "Fahrenheit";
    Unit["Kelvin"] = "Kelvin";
})(Unit || (Unit = {}));
function getAllUnits() {
    return [Unit.Celcius, Unit.Fahrenheit, Unit.Kelvin];
}
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
    else {
        state.targetValue = state.sourceValue;
    }
    return state;
}
function toUnit(text) {
    const ret = getAllUnits().filter(u => u.toString() === text);
    return ret.length === 0 ? null : ret[0];
}
function view(dispatch, state) {
    const divMain = document.createElement('div');
    divMain.id = 'main-div';
    const div1 = document.createElement('div');
    const lab1 = document.createElement('h1');
    lab1.innerText = 'input';
    div1.appendChild(lab1);
    div1.appendChild(input(state.sourceValue, (ev) => {
        state.sourceValue = ev.target.value;
    }));
    div1.appendChild(combobox(getAllUnits(), state.from, (ev) => {
        // not an error!
        const selected = toUnit(ev.target.value);
        if (selected) {
            state.from = selected;
            dispatch();
        }
    }));
    const div2 = document.createElement('div');
    const lab2 = document.createElement('h1');
    lab2.innerText = 'result';
    div2.appendChild(lab2);
    div2.appendChild(input(state.targetValue, (ev) => {
        state.targetValue = ev.target.value;
    }));
    div2.appendChild(combobox(getAllUnits(), state.to, (ev) => {
        const selected = toUnit(ev.target.value);
        if (selected) {
            state.to = selected;
            dispatch();
        }
    }));
    divMain.appendChild(div1);
    divMain.appendChild(div2);
    return divMain;
}
function combobox(values, selectedValue, inputCallback) {
    const sel = document.createElement('select');
    sel.addEventListener('change', inputCallback);
    const createOption = (val) => {
        const o = document.createElement('option');
        o.value = val.toString();
        o.innerText = val.toString();
        if (val === selectedValue) {
            o.selected = true;
        }
        return o;
    };
    values
        .map(v => createOption(v))
        .forEach(v => sel.appendChild(v));
    return sel;
}
function input(value, inputCallback) {
    const inp = document.createElement('input');
    inp.type = 'number';
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
        to: Unit.Fahrenheit,
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
