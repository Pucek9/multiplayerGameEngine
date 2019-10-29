import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../interfaces/ScreenModel';
import { FontLoader, Mesh, MeshPhongMaterial, TextGeometry } from 'three';
import * as fontFile from '../games/balls/fonts/gentilis_bold.typeface.json';
import ICamera from './Camera/ICamera';

const loader = new FontLoader();
const font = loader.parse(fontFile);

export default class Text implements IUpdatable {
  public x: number;
  public y: number;
  public z: number = 50;
  public object: Mesh;
  public offsetX: number = -20;
  public offsetY: number = 30;
  public color: number = 0x4444fff;
  public text: string;
  private screen: ScreenModel;
  private camera: ICamera;
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

  init(screen: ScreenModel, camera: ICamera) {
    this.screen = screen;
    this.camera = camera;
    this.setText('');
  }

  update() {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
    this.object.rotation.x = this.camera.object.rotation.x;
    this.object.rotation.y = this.camera.object.rotation.y;
    this.object.rotation.z = this.camera.object.rotation.z;
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
