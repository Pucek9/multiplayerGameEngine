import { renderImage } from '../../../../shared/canvasHelpers';

const cursorPNG = require('../../../assets/textures/games/balls/2d/pointer.png').default;

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';
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
    // this.screen.scene.add(this.id);
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    renderImage(ctx, camera, this.img, this.x, this.y, this.img.width, this.img.height, 0);
    ctx.restore();
  }
}
