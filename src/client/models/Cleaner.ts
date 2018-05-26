import IRenderable from "../interfaces/IRenderable";

export default class Cleaner implements IRenderable {

    constructor(
        public screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) {
    }

    render() {
        this.screen.ctx.clearRect(0, 0, this.screen.canvas.width, this.screen.canvas.height);
    }

}