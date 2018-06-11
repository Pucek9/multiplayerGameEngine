import IRenderable from "../interfaces/IRenderable";
import {screen} from "../types/screen";
const THREE = require('three');

export default class Menu implements IRenderable {

    public img: HTMLImageElement;

    constructor(src: string, public screen: screen) {
        // this.img = new Image();
        // this.img.src = src;
    }

    render() {
        // this.screen.ctx.drawImage(
        //     this.img,
        //     0,
        //     0
        // )
    }

}