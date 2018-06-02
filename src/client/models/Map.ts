import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";
import {screen} from "../types/screen";

export default class Map implements IRenderable {

    public img: HTMLImageElement;

    constructor(src: string,    public screen: screen) {
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