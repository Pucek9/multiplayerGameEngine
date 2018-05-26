import StaticRectangleObjectModel from "../../common/models/StaticRectangleObjectModel";
import IRenderable from "../interfaces/IRenderable";
import PlayerModel from "../../common/models/PlayerModel";

export default class StaticRectangleObject extends StaticRectangleObjectModel implements IRenderable {
    public screen: { canvas: any, ctx: any };

    render(activePlayer: PlayerModel) {
        this.screen.ctx.fillStyle = this.color;
        this.screen.ctx.fillRect(
            this.screen.canvas.width / 2 - (activePlayer.x - this.x),
            this.screen.canvas.height / 2 - (activePlayer.y - this.y),
            this.width,
            this.height
        );
    }

}