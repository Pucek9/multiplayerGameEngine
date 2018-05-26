import PlayerModel from "../../common/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

export default class Player extends PlayerModel implements IRenderable {

    public screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D };

    renderBody(activePlayer: PlayerModel) {
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

    renderText(activePlayer: PlayerModel) {
        this.screen.ctx.font = '10pt Arial';
        this.screen.ctx.lineWidth = 1;
        this.screen.ctx.fillStyle = 'black';
        this.screen.ctx.textAlign = 'center';
        this.screen.ctx.fillText(
            `${this.name} ${this.hp}`,
            this.screen.canvas.width / 2 - (activePlayer.x - this.x) + this.size / 2,
            this.screen.canvas.width / 2 - (activePlayer.y - this.y) - 5
        );
    }

    render(activePlayer: PlayerModel) {
        this.renderBody(activePlayer);
        this.renderText(activePlayer);
    }

}