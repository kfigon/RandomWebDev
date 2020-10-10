import { MyCanvas } from './Canvas.js';


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    main(rootElement);
}

function main(rootElement: HTMLElement) {
    
    rootElement.innerText = "hello!"
    const canvasElement : HTMLCanvasElement = document.createElement('canvas');
    canvasElement.width = 500;
    canvasElement.height = 500;
    rootElement.appendChild(canvasElement);

    const ctx : CanvasRenderingContext2D | null = canvasElement.getContext('2d');
    if(!ctx) {
        throw new Error('null canvas ctx');
    }
    
    const canvas : MyCanvas = new MyCanvas(ctx);
    canvas.hello();
}