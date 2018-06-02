import IRenderable from "../interfaces/IRenderable";
import {screen} from "../types/screen";

export default class Cursor implements IRenderable {

    public x: number;
    public y: number;
    public img: HTMLImageElement;

    constructor(src: string,    public screen: screen) {
        this.img = new Image();
        this.img.src = src;
    };

    render() {
        this.screen.ctx.drawImage(
            this.img,
            this.x - this.img.width / 2,
            this.y - this.img.height / 2
        );
    }
}