import BulletModel from "../../shared/models/BulletModel";
import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";
import {Screen} from "../types/Screen";
const THREE = require('three');

export default class Bullet extends BulletModel implements IRenderable {

    public screen: Screen;
    private object;

    init(screen: Screen) {
        const geometry = new THREE.SphereGeometry(this.size ,10, 10, 3);
        const material = new THREE.MeshBasicMaterial({color: 'black'});
        this.object = new THREE.Mesh(geometry, material);

        this.object.position.z = 10;
        screen.scene.add(this.object);
    }

    remove(screen: Screen) {
        screen.scene.remove(this.object)
    }

    render(activePlayer: PlayerModel) {
        this.object.position.x = this.x;
        this.object.position.y = this.y;
    }

}