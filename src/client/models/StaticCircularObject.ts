import StaticCircularObjectModel from "../../shared/models/StaticCircularObjectModel";
import IRenderable from "../interfaces/IRenderable";
import PlayerModel from "../../shared/models/PlayerModel";
import {screen} from "../types/screen";

const THREE = require('three');

export default class StaticCircularObject extends StaticCircularObjectModel implements IRenderable {
    private cylinder;

    init(screen: screen) {
        function degToRad(deg) {
            return deg * Math.PI / 180;
        }

        const geometry = new THREE.CylinderGeometry(20 ,this.size, 80, 32);
        const material = new THREE.MeshBasicMaterial({color: this.color});
        this.cylinder = new THREE.Mesh(geometry, material);
        this.cylinder.rotation.x = degToRad(90)
        this.cylinder.position.x = this.x;
        this.cylinder.position.y = this.y;
        screen.scene.add(this.cylinder);
    }

    render() {


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


    }
}