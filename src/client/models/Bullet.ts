import BulletModel from "../../shared/models/BulletModel";
import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";
import {screen} from "../types/screen";

export default class Bullet extends BulletModel implements IRenderable {

    public screen: screen;

    render(activePlayer: PlayerModel) {
        this.screen.ctx.beginPath();
        this.screen.ctx.arc(
            this.screen.canvas.width / 2 - (activePlayer.x - this.x),
            this.screen.canvas.height / 2 - (activePlayer.y - this.y),
            2,
            0,
            2 * Math.PI
        );
        this.screen.ctx.fillStyle = "black";
        this.screen.ctx.fill();
    }

}