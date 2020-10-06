import { CylinderGeometry, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

import { degToRad } from '../../../../shared/helpers';
import { CircularObjectModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class CircularObject extends CircularObjectModel implements Updatable {
  protected object: Mesh;
  private screen: ScreenModel;

  async init(screen: ScreenModel) {
    this.screen = screen;
    const path = await this.screen.texture.getTextureSrc(TEXTURE.CUMIN);
    const texture = new TextureLoader().load(path);
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

  remove() {
    this.screen.scene.remove(this.object);
  }
}
