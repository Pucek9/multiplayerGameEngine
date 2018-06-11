import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

import {screen} from "../types/screen";

export default class Camera implements IRenderable {
    private screen;

    constructor(private activePlayer: PlayerModel) {

    };

    init(screen: screen) {
        this.screen = screen;
    }

    render() {
        this.screen.camera.position.x = this.activePlayer.x;
        this.screen.camera.position.y = this.activePlayer.y;
    }
}