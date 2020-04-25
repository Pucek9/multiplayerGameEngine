import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

import Updatable from '../interfaces/Updatable';
import ScreenModel from '../interfaces/ScreenModel';
export default class Cursor implements Updatable {
  public x: number;
  public y: number;
  public object: Mesh;
  public z = 50;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  constructor(public src: string) {
    // this.img = new Image();
    // this.img.src = src;
    // this.img.material.depthTest = false;
    // this.img.material.depthWrite = false;
  }

  setGeometry() {
    this.geometry = new SphereGeometry(10, 10, 10, 1);
  }

  setMaterial() {
    this.material = new MeshPhongMaterial({
      map: new TextureLoader().load(this.src),
    });
  }

  init(screen: ScreenModel) {
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
