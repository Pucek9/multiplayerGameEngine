import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

const THREE = require('three');
import {Screen} from "../types/Screen";

export default class Map implements IRenderable {

    public img: HTMLImageElement;
    private object;

    constructor(public src: string) {
        // this.img = new Image();
        // this.img.src = src;
    };

    init(screen: Screen) {
        this.object = new THREE.Mesh(
            new THREE.PlaneGeometry(2920, 2004, 0),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(this.src)
            })
        );

        this.object.material.depthTest = false;
        this.object.material.depthWrite = false;
        screen.scene.add(this.object);
    }

    render(activePlayer: PlayerModel) {

    }
}