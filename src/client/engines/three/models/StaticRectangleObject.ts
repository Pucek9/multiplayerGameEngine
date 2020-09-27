import { BoxGeometry, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

import { degToRad } from '../../../../shared/helpers';
import { StaticRectangleObjectModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class StaticRectangleObject extends StaticRectangleObjectModel implements Updatable {
  private object: Mesh;
  private screen: ScreenModel;

  async init(screen: ScreenModel) {
    this.screen = screen;
    const path = await this.screen.texture.getTextureSrc(TEXTURE.BOX);
    const texture = new TextureLoader().load(path);
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

  remove() {
    this.screen.scene.remove(this.object);
  }
}
