import PlayerModel from "../../common/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

export default class Map implements IRenderable {

    public img: HTMLImageElement;

    constructor(src: string, public screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) {
        this.img = new Image();
        this.img.src = src;
    };

    render(activePlayer: PlayerModel) {
        this.screen.ctx.drawImage(
            this.img,
            this.screen.canvas.width / 2 - activePlayer.x,
            this.screen.canvas.height / 2 - activePlayer.y
        );
    }
}