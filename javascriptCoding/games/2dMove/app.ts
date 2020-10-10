import { MyCanvas } from './Canvas.js';


const canvasElement: HTMLCanvasElement | null = <HTMLCanvasElement>document.getElementById('canvas');
if (canvasElement) {
    main(canvasElement);
} else {
    throw new Error('no \'canvas\' element!');
}

function main(canvasElement: HTMLCanvasElement) {
    canvasElement.width = 500;
    canvasElement.height = 500;

    const ctx: CanvasRenderingContext2D | null = canvasElement.getContext('2d');

    if (!ctx) throw new Error('null canvas ctx');

    const canvas: MyCanvas = new MyCanvas(ctx, canvasElement.width, canvasElement.height);

    window.setInterval(() => {
        canvas.clear();
        canvas.hello();
    }, 30);
}