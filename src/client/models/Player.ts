import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";
import {Screen} from "../types/Screen";
const THREE = require('three');

export default class Player extends PlayerModel implements IRenderable {

    public object;

    init(screen: Screen) {
        function degToRad(deg) {
            return deg * Math.PI / 180;
        }

        const geometry = new THREE.SphereGeometry(20 ,10, 10, 1);
        const material = new THREE.MeshBasicMaterial({color: this.color});
        this.object = new THREE.Mesh(geometry, material);

        screen.scene.add(this.object);
    }

    renderBody() {
        this.object.position.x = this.x;
        this.object.position.y = this.y;
    }

    render() {
        this.renderBody();
        // this.renderText();
    }

    remove(screen: Screen) {
        screen.scene.remove(this.object)
    }
    // renderBody(activePlayer: PlayerModel) {
        // this.screen.ctx.fillStyle = this.color;
        // this.screen.ctx.beginPath();
        // this.screen.ctx.arc(
        //     this.screen.canvas.width / 2 - (activePlayer.x - this.x),
        //     this.screen.canvas.height / 2 - (activePlayer.y - this.y),
        //     this.size,
        //     0,
        //     2 * Math.PI
        // );
        // this.screen.ctx.fill();
    // }

    // renderText(activePlayer: PlayerModel) {
        // this.screen.ctx.font = '10pt Arial';
        // this.screen.ctx.lineWidth = 1;
        // this.screen.ctx.fillStyle = 'black';
        // this.screen.ctx.textAlign = 'center';
        // this.screen.ctx.fillText(
        //     `${this.name} ${this.hp}`,
        //     this.screen.canvas.width / 2 - (activePlayer.x - this.x),
        //     this.screen.canvas.height / 2 - (activePlayer.y - this.y) - (this.size + 16)
        // );
    // }



}