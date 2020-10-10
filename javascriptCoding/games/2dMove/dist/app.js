import { MyCanvas } from './Canvas.js';
const canvasElement = document.getElementById('canvas');
if (canvasElement) {
    main(canvasElement);
}
else {
    throw new Error('no \'canvas\' element!');
}
function main(canvasElement) {
    canvasElement.width = 500;
    canvasElement.height = 500;
    const ctx = canvasElement.getContext('2d');
    if (!ctx)
        throw new Error('null canvas ctx');
    const canvas = new MyCanvas(ctx, canvasElement.width, canvasElement.height);
    window.setInterval(() => {
        canvas.clear();
        canvas.hello();
    }, 30);
}
