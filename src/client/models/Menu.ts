import IRenderable from "../interfaces/IRenderable";
import {Screen} from "../types/Screen";
const THREE = require('three');

export default class Menu implements IRenderable {

    public img: HTMLImageElement;

    constructor(src: string, public screen: Screen) {
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