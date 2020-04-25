import { CylinderGeometry, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

import { degToRad } from '../../shared/helpers';
import { StaticCircularObjectModel } from '../../shared/models';

import ScreenModel from '../interfaces/ScreenModel';
import Updatable from '../interfaces/Updatable';

const cumin = require('../games/balls/images/cumin.jpg');

export default class StaticCircularObject extends StaticCircularObjectModel implements Updatable {
  protected object: Mesh;

  init(screen: ScreenModel) {
    const texture = new TextureLoader().load(cumin);
    const geometry = new CylinderGeometry(this.size, this.size, 80, 32);
    const material = new MeshPhongMaterial({
      map: texture,
      color: this.color,
    });
    this.object = new Mesh(geometry, material);
    this.object.rotation.x = degToRad(90);
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    this.object.castShadow = true;
    this.object.receiveShadow = true;
    screen.scene.add(this.object);
  }

  update() {}
}
