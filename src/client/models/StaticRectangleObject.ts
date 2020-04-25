import { BoxGeometry, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

import { degToRad } from '../../shared/helpers';
import { StaticRectangleObjectModel } from '../../shared/models';

import Updatable from '../interfaces/Updatable';
import ScreenModel from '../interfaces/ScreenModel';

const box = require('../games/balls/images/box.png');

export default class StaticRectangleObject extends StaticRectangleObjectModel implements Updatable {
  private object: Mesh;

  init(screen: ScreenModel) {
    const texture = new TextureLoader().load(box);
    const geometry = new BoxGeometry(this.width, this.height, this.depth);
    const material = new MeshPhongMaterial({
      map: texture,
      color: this.color,
    });
    this.object = new Mesh(geometry, material);

    this.object.rotation.z = degToRad(this.deg);

    this.object.position.x = this.x + this.width / 2;
    this.object.position.y = this.y + this.height / 2;
    this.object.position.z = this.z + this.depth / 2;

    this.object.castShadow = true;
    this.object.receiveShadow = true;
    screen.scene.add(this.object);
  }

  update() {}
}
