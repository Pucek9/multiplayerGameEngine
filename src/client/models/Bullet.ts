import BulletModel from "../../api/BulletModel";
import PlayerModel from "../../api/PlayerModel";
import IRenderable from "./IRenderable";

export default class Bullet extends BulletModel implements IRenderable {

    public screen: { canvas: any, ctx: any };

    render(activePlayer: PlayerModel) {
        this.screen.ctx.beginPath();
        this.screen.ctx.arc(
            this.screen.canvas.width / 2 - (activePlayer.x - this.x),
            this.screen.canvas.height / 2 - (activePlayer.y - this.y),
            2, 0, 2 * Math.PI);
        this.screen.ctx.fillStyle = "black";
        this.screen.ctx.fill();
    }

}