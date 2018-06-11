import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";
import {screen} from "../types/screen";
const THREE = require('three');

export default class Player extends PlayerModel implements IRenderable {

    private cylinder;

    init(screen: screen) {
        function degToRad(deg) {
            return deg * Math.PI / 180;
        }

        const geometry = new THREE.CylinderGeometry(20 ,this.size, 80, 32);
        const material = new THREE.MeshBasicMaterial({color: this.color});
        this.cylinder = new THREE.Mesh(geometry, material);
        this.cylinder.rotation.x = degToRad(90);
        screen.scene.add(this.cylinder);
    }

    renderBody() {
        this.cylinder.position.x = this.x;
        this.cylinder.position.y = this.y;
    }

    render() {
        this.renderBody();
        // this.renderText();
    }

    remove(screen: screen) {
        screen.scene.remove(this.cylinder)
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