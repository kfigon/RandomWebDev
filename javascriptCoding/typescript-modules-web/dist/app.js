import { MyCanvas } from './Canvas.js';
const rootElement = document.getElementById('root');
if (rootElement) {
    main(rootElement);
}
function main(rootElement) {
    rootElement.innerText = "hello!";
    const canvasElement = document.createElement('canvas');
    canvasElement.width = 500;
    canvasElement.height = 500;
    rootElement.appendChild(canvasElement);
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
        throw new Error('null canvas ctx');
    }
    const canvas = new MyCanvas(ctx);
    canvas.hello();
}
