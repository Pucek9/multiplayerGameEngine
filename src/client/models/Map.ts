import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';
import {Screen} from '../types/Screen';

const THREE = require('three');

export default class Map implements IRenderable {

    public img: HTMLImageElement;
    private object;

    constructor(public src: string) {
    };

    init(screen: Screen) {
        this.object = new THREE.Mesh(
            new THREE.PlaneGeometry(2920, 2004, 0),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(this.src),
            }),
        );

        // this.object.material.depthTest = false;
        // this.object.material.depthWrite = false;
        this.object.receiveShadow = true;

        screen.scene.add(this.object);
    }

    render(activePlayer: PlayerModel) {

    }
}
