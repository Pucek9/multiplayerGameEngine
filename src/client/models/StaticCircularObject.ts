import StaticCircularObjectModel from "../../shared/models/StaticCircularObjectModel";
import IRenderable from "../interfaces/IRenderable";
import PlayerModel from "../../shared/models/PlayerModel";

export default class StaticCircularObject extends StaticCircularObjectModel implements IRenderable {
    public screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D };

    render(activePlayer: PlayerModel) {
        this.screen.ctx.fillStyle = this.color;
        this.screen.ctx.beginPath();
        this.screen.ctx.arc(
            this.screen.canvas.width / 2 - (activePlayer.x - this.x),
            this.screen.canvas.height / 2 - (activePlayer.y - this.y),
            this.size,
            0,
            2 * Math.PI
        );
        this.screen.ctx.fill();
    }
}