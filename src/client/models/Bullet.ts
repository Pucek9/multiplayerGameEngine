import BulletModel from "../../shared/models/BulletModel";
import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";
import {Screen} from "../types/Screen";
const THREE = require('three');

export default class Bullet extends BulletModel implements IRenderable {

    public screen: Screen;
    private ball;

    init(screen: Screen) {
        const geometry = new THREE.SphereGeometry(this.size ,10, 10, 3);
        const material = new THREE.MeshBasicMaterial({color: 'black'});
        this.ball = new THREE.Mesh(geometry, material);

        this.ball.position.z = 10;
        screen.scene.add(this.ball);
    }

    remove(screen: Screen) {
        screen.scene.remove(this.ball)
    }

    render(activePlayer: PlayerModel) {
        this.ball.position.x = this.x;
        this.ball.position.y = this.y;
        // this.screen.ctx.beginPath();
        // this.screen.ctx.arc(
        //     this.screen.canvas.width / 2 - (activePlayer.x - this.x),
        //     this.screen.canvas.height / 2 - (activePlayer.y - this.y),
        //     2,
        //     0,
        //     2 * Math.PI
        // );
        // this.screen.ctx.fillStyle = "black";
        // this.screen.ctx.fill();
    }

}