import IRenderable from "../interfaces/IRenderable";

export default class Menu implements IRenderable {

    public img: HTMLImageElement;

    constructor(src: string, public screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) {
        this.img = new Image();
        this.img.src = src;
    }

    render() {
        this.screen.ctx.drawImage(this.img, 0, 0)
    }

}