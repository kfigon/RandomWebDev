class MyCanvas {
    ctx : CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    hello() {
        console.log('yo!');
        
    }
}

export { MyCanvas };
