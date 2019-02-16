import StaticCircularObjectModel from '../../shared/models/StaticCircularObjectModel';
import IRenderable from '../interfaces/IRenderable';
import ScreenModel from '../types/ScreenModel';
import { CylinderGeometry, Math, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

const cumin = require('../games/balls/images/head.jpg');

export default class StaticCircularObject extends StaticCircularObjectModel implements IRenderable {
  private object: Mesh;

  init(screen: ScreenModel) {
    const texture = new TextureLoader().load(cumin);
    const geometry = new CylinderGeometry(this.size, this.size, 80, 32);
    const material = new MeshPhongMaterial({
      map: texture,
      color: this.color,
    });
    this.object = new Mesh(geometry, material);
    this.object.rotation.x = Math.degToRad(90);
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    screen.scene.add(this.object);
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
