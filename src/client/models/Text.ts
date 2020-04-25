import { FontLoader, Mesh, MeshPhongMaterial, TextGeometry } from 'three';

import * as fontFile from '../games/balls/fonts/gentilis_bold.typeface.json';
import Updatable from '../interfaces/Updatable';
import ScreenModel from '../interfaces/ScreenModel';

const loader = new FontLoader();
const font = loader.parse(fontFile);

export default class Text implements Updatable {
  public x: number;
  public y: number;
  public object: Mesh;
  public text: string;
  public offsetX = -20;
  public offsetY = 30;
  public color = 0x4444fff;
  public z = 50;
  private screen: ScreenModel;
  private geometry: TextGeometry;
  private material: MeshPhongMaterial;

  constructor() {}

  setGeometry() {
    this.geometry = new TextGeometry(this.text, {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });
  }

  setText(text: string) {
    if (this.isOnScene()) {
      this.remove();
    }
    this.text = text;
    this.setGeometry();
    this.setMaterial();
    this.object = new Mesh(this.geometry, this.material);
    this.object.position.z = this.z;
    this.addToScene();
  }

  setMaterial() {
    this.material = new MeshPhongMaterial({ color: this.color, flatShading: true });
  }

  init(screen: ScreenModel) {
    this.screen = screen;
    this.setText('');
  }

  update() {
    const camera = this.screen.camera.object;
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    this.object.rotation.x = camera.rotation.x;
    this.object.rotation.y = camera.rotation.y;
    this.object.rotation.z = camera.rotation.z;
  }

  hide() {
    this.object.visible = false;
  }

  show() {
    this.object.visible = true;
  }

  isOnScene() {
    return this.screen.scene.children.includes(this.object);
  }

  addToScene() {
    this.screen.scene.add(this.object);
  }

  remove() {
    this.screen.scene.remove(this.object);
  }
}
