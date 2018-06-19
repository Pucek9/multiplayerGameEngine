import IRenderable from "../interfaces/IRenderable";
import {Screen} from "../types/Screen";

const THREE = require('three');

export default class Light implements IRenderable {

    private light;
    private activePlayer;
    private cursor;

    constructor(public screen: Screen) {
    }

    init(activePlayer, cursor) {
        this.activePlayer = activePlayer;
        this.cursor = cursor;
        console.log('lajt')

        this.light = new THREE.PointLight(0xffffff, 10);

        this.light.shadowBias = 0.0001;
        this.light.castShadow = true;
        this.light.shadowDarkness = 0.3;
        this.light.shadowCameraVisible = true;

        this.screen.scene.add(this.light)
    }

    remove() {
        this.screen.scene.remove(this.light)
    }

    render() {
        this.light.position.set(this.activePlayer.x, this.activePlayer.y, 30);
        // this.light.target.position.set(this.cursor.x, this.cursor.y, 20);
    }
}