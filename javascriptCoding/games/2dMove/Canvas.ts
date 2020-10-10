class MyCanvas {
    ctx : CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    hello() {
        this.ctx.strokeRect(Math.random()*this.width, 140, 150, 110);
    }

    clear() {       
        this.ctx.clearRect(0,0, this.width, this.height)
    }
}

export { MyCanvas };
