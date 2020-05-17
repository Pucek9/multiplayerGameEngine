// import * as fontFile from '../../../games/balls/fonts/gentilis_bold.typeface.json';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

// const font = loader.parse(fontFile);

export default class Text implements Updatable {
  public x: number;
  public y: number;
  public text: string;
  public offsetX = -20;
  public offsetY = 30;
  public color = 0x4444fff;
  public z = 50;
  private screen: ScreenModel;

  constructor() {}

  setGeometry() {}

  setText(text: string) {
    if (this.isOnScene()) {
      this.remove();
    }
    this.text = text;
    this.setGeometry();
    this.setMaterial();
    this.addToScene();
  }

  setMaterial() {}

  init(screen: ScreenModel) {
    this.screen = screen;
    this.setText('');
  }

  update() {
    // const camera = this.screen.camera.object;
    // this.object.position.x = this.x;
    // this.object.position.y = this.y;
    // this.object.rotation.x = camera.rotation.x;
    // this.object.rotation.y = camera.rotation.y;
    // this.object.rotation.z = camera.rotation.z;
  }

  hide() {
    // this.visible = false;
  }

  show() {
    // this.visible = true;
  }

  isOnScene() {
    return this.screen.scene.has(this.object);
  }

  addToScene() {
    this.screen.scene.add(this.object);
  }

  remove() {
    this.screen.scene.delete(this.object);
  }
}
