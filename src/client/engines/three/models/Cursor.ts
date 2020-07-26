import { Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader } from 'three';

import CursorModel from '../../../interfaces/CursorModel';
import ScreenModel from '../../../interfaces/ScreenModel';
const cursorPNG = require('../../../assets/textures/games/balls/3d/pointer.png');

export default class Cursor implements CursorModel {
  public x: number;
  public y: number;
  public z = 50;
  public object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshPhongMaterial;

  constructor(public src: string = cursorPNG) {}

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
