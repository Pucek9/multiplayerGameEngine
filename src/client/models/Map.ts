import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../interfaces/ScreenModel';
import { Mesh, MeshPhongMaterial, PlaneGeometry, TextureLoader } from 'three';

export default class Map implements IUpdatable {
  public img: HTMLImageElement;
  private object: Mesh;

  constructor(public src: string) {}

  init(screen: ScreenModel) {
    this.object = new Mesh(
      new PlaneGeometry(2920, 2004, 0),
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
