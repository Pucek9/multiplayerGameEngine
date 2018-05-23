import PlayerModel from "../../api/PlayerModel";
import IRenderable from "./IRenderable";

export default class Player extends PlayerModel implements IRenderable {

    public screen: { canvas: any, ctx: any };

    renderBody(activePlayer: PlayerModel) {
        this.screen.ctx.fillStyle = this.color;
        this.screen.ctx.fillRect(
            this.screen.canvas.width / 2 - (activePlayer.x - this.x),
            this.screen.canvas.height / 2 - (activePlayer.y - this.y),
            this.width,
            this.height
        );
    }

    renderText(activePlayer: PlayerModel) {
        this.screen.ctx.font = '10pt Arial';
        this.screen.ctx.lineWitdh = 1;
        this.screen.ctx.fillStyle = 'black';
        this.screen.ctx.textAlign = 'center';
        this.screen.ctx.fillText(
            `${this.name} ${this.hp}`,
            this.screen.canvas.width / 2 - (activePlayer.x - this.x) + this.width / 2,
            this.screen.canvas.width / 2 - (activePlayer.y - this.y) - 5
        );
    }

    render(activePlayer: PlayerModel) {
        this.renderBody(activePlayer);
        this.renderText(activePlayer);
    }

}