interface State{

}
enum Action{
    FOO
}

function update(state: State, action: Action): State {
    return state;
}

function view(dispatch: Function, state: State) : HTMLElement{
    const div = document.createElement('div');
    
    const but = document.createElement('button');
    but.innerText='click me';
    but.addEventListener('click', () => dispatch(Action.FOO));
    
    div.appendChild(but);
    return div;
}

function app() {
    const app: HTMLElement | null = document.getElementById('app');
    if(!app) {
        alert('no app');
        throw new Error("no app");
    }

    let state = {}
    let viewNode = view(dispatch, state);
    app.appendChild(viewNode);

    function dispatch(action: Action) {
        console.log('updating app');
        
       state = update(state, action);
       const updatedView = view(dispatch, state);
       if(!app) return;

       app.replaceChild(updatedView, viewNode);
       viewNode = updatedView;
    }
}

app();