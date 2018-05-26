import PlayerModel from "../../common/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

export default class PlayerList implements IRenderable {

    constructor(
        public screen: { canvas: any, ctx: any }) {
    }

    render(players: PlayerModel[]) {
        this.screen.ctx.font = '10pt Arial';
        this.screen.ctx.lineWitdh = 1;
        this.screen.ctx.fillStyle = 'black';
        this.screen.ctx.textAlign = 'left';
        this.screen.ctx.fillText('Active players:', 10, 15);
        players.forEach((_player, i) => {
            this.screen.ctx.fillStyle = _player.color;
            this.screen.ctx.fillText(`${_player.name}: ${_player.score}`, 10, 30 + i * 15);
        });
    }

}