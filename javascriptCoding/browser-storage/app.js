const storeElement = document.getElementById('store');
const readElement = document.getElementById('read');
const removeElement = document.getElementById('remove');

const KEY = 'myKey'

storeElement.addEventListener('click', storeItem);
readElement.addEventListener('click', readItem);
removeElement.addEventListener('click', removeItem);

// local storage and session storage

// cookies - document.cookie returns all cookies
// document.cookie = 'userId=123'
// document.cookie = 'asd=JSON.stringify({...})'
// will store both
// cookies are the same as localstorage, 
// but sent to server

// indexedDB for more complicated data


// stores any strings
//  we can even store json
// JSON.stringify(object) and JSON.parse()
function storeItem() {
    const userData = "My secret data!";
    localStorage.setItem(KEY, userData);

    setLabel('item stored', 'action');
    setLabel('', 'result');
}

function readItem() {
    setLabel('reading data...', 'action');

    const data = localStorage.getItem(KEY);
    setLabel(`result: ${data}`, 'result');
}

function removeItem(){
    localStorage.removeItem(KEY);
    setLabel('item removed!', 'action');
    setLabel('', 'result');
}

function setLabel(text, elementId) {
    const el = document.getElementById(elementId);
    el.innerText = text;
}