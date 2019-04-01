import IRenderable from '../interfaces/IRenderable';
import ScreenModel from '../types/ScreenModel';
import {
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';

export default class Cursor implements IRenderable {
  public x: number;
  public y: number;
  // public img: HTMLImageElement;
  // private img;
  public object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial ;

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
    this.object.position.z = 50;
    screen.scene.add(this.object);
  }

  render() {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    // this.screen.ctx.drawImage(
    //     this.img,
    //     this.x - this.img.width / 2,
    //     this.y - this.img.height / 2
    // );
  }
}
