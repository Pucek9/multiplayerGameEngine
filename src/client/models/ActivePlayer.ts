import PlayerModel from "../../common/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

export default class ActivePlayer extends PlayerModel implements IRenderable {

    public screen: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D };

    renderBody() {
        this.screen.ctx.fillStyle = this.color;
        this.screen.ctx.beginPath();
        this.screen.ctx.arc(
            this.screen.canvas.width / 2,
            this.screen.canvas.height / 2,
            this.size,
            0,
            2 * Math.PI
        );
        this.screen.ctx.fill();
    }

    renderText() {
        this.screen.ctx.font = '10pt Arial';
        this.screen.ctx.lineWidth = 1;
        this.screen.ctx.fillStyle = 'black';
        this.screen.ctx.textAlign = 'center';
        this.screen.ctx.fillText(
            `${this.name} ${this.hp}`,
            this.screen.canvas.width / 2 + this.size / 2,
            this.screen.canvas.width / 2 - 5
        );
    }

    render() {
        this.renderBody();
        this.renderText();
    }

}