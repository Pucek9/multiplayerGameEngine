import PlayerModel from "../../api/PlayerModel";
import IRenderable from "./IRenderable";

export default class ActivePlayer extends PlayerModel implements IRenderable {

    public screen: { canvas: any, ctx: any };

    renderBody() {
        this.screen.ctx.fillStyle = this.color;
        this.screen.ctx.fillRect(
            this.screen.canvas.width / 2,
            this.screen.canvas.height / 2,
            this.width,
            this.height
        );
    }

    renderText() {
        this.screen.ctx.font = '10pt Arial';
        this.screen.ctx.lineWitdh = 1;
        this.screen.ctx.fillStyle = 'black';
        this.screen.ctx.textAlign = 'center';
        this.screen.ctx.fillText(
            `${this.name} ${this.hp}`,
            this.screen.canvas.width / 2 + this.width / 2,
            this.screen.canvas.width / 2 - 5
        );
    }

    render() {
        this.renderBody();
        this.renderText();
    }

}