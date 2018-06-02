import IRenderable from "../interfaces/IRenderable";
import {screen} from "../types/screen";

export default class Cleaner implements IRenderable {

    constructor(
        public screen: screen) {
    }

    render() {
        this.screen.ctx.clearRect(
            0,
            0,
            this.screen.canvas.width,
            this.screen.canvas.height
        );
    }

}