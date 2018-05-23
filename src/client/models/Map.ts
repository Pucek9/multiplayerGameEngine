import PlayerModel from "../../api/PlayerModel";
import IRenderable from "./IRenderable";

export default class Map implements IRenderable {

    public img: HTMLImageElement;

    constructor(src: string, public screen: { canvas: any, ctx: any }) {
        this.img = new Image();
        this.img.src = src;
    };

    render(activePlayer: PlayerModel) {
        this.screen.ctx.drawImage(this.img, this.screen.canvas.width / 2 - activePlayer.x, this.screen.canvas.height / 2 - activePlayer.y);
    }
}