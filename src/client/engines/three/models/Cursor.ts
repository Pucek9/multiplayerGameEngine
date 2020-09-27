import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

import { TEXTURE } from '../../../assets/textures';
import CursorModel from '../../../interfaces/CursorModel';
import ScreenModel from '../../../interfaces/ScreenModel';

export default class Cursor implements CursorModel {
  public x: number;
  public y: number;
  public z = 50;
  public object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;
  private screen: ScreenModel;

  constructor() {}

  setGeometry() {
    this.geometry = new SphereGeometry(10, 10, 10, 1);
  }

  async setMaterial() {
    const map = await this.screen.texture.getTexture(TEXTURE.POINTER);
    this.material = new MeshPhongMaterial({
      map: new TextureLoader().load(map),
    });
  }

  init(screen: ScreenModel) {
    this.screen = screen;
    this.setGeometry();
    this.setMaterial();
    this.object = new Mesh(this.geometry, this.material);
    this.object.position.z = this.z;
    screen.scene.add(this.object);
  }

  update() {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }
}
