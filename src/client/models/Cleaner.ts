import IRenderable from "./IRenderable";

export default class Cleaner implements IRenderable {

    constructor(
        public screen: { canvas: any, ctx: any }) {
    }

    render() {
        this.screen.ctx.clearRect(0, 0, this.screen.canvas.width, this.screen.canvas.height);
    }

}