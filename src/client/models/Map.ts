import PlayerModel from "../../shared/models/PlayerModel";
import IRenderable from "../interfaces/IRenderable";

const THREE = require('three');
import {screen} from "../types/screen";

export default class Map implements IRenderable {

    public img: HTMLImageElement;
    private backgroundMesh;

    constructor(public src: string) {
        // this.img = new Image();
        // this.img.src = src;
        this.backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2920, 2004, 0),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(this.src)
            })
        );

        this.backgroundMesh.material.depthTest = false;
        this.backgroundMesh.material.depthWrite = false;
    };

    init(screen: screen) {
        screen.scene.add(this.backgroundMesh);
    }

    render(activePlayer: PlayerModel) {

    }
}