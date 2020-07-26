import { Mesh, MeshPhongMaterial, PlaneGeometry, TextureLoader } from 'three';

import { MapModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class Map implements Updatable, MapModel {
  public src: string;
  private object: Mesh;
  mapName: string;
  width: number;
  height: number;
  floor: string;

  constructor(props: MapModel) {
    Object.assign(this, props);
  }

  async init(screen: ScreenModel) {
    this.src = await screen.texture.getTexture(TEXTURE[this.floor]);
    this.object = new Mesh(
      new PlaneGeometry(this.width, this.height, 0),
      new MeshPhongMaterial({
        map: new TextureLoader().load(this.src),
      }),
    );

    // this.object.material.depthTest = false;
    // this.object.material.depthWrite = false;
    this.object.receiveShadow = true;

    screen.scene.add(this.object);
  }

  update() {}
}
