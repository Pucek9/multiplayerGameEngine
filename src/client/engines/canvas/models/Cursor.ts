const cursorPNG = require('../../../games/balls/images/pointer.jpg');

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
export default class Cursor implements Updatable {
  public x: number;
  public y: number;
  public z = 50;
  public screen: ScreenModel;
  public img: HTMLImageElement;

  constructor(public src: string = cursorPNG) {
    this.img = new Image();
    this.img.src = src;
  }

  init(screen: ScreenModel) {
    this.screen = screen;
    this.screen.scene.add(this);
  }

  update() {
    this.screen.renderer.ctx.drawImage(
      this.img,
      this.screen.renderer.domElement.width / 2 - (this.screen.camera.x - this.x),
      this.screen.renderer.domElement.height / 2 + (this.screen.camera.y - this.y),
    );
  }
}
