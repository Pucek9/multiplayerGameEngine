import { renderImage } from '../../../../shared/canvasHelpers';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

export default class Cursor implements Updatable {
  public x: number;
  public y: number;
  public z = 50;
  public screen: ScreenModel;
  public img: HTMLImageElement;
  public size = 5;

  constructor() {
    this.img = new Image();
  }

  async init(screen: ScreenModel) {
    this.screen = screen;
    this.img.src = await this.screen.texture.getTexture(TEXTURE.POINTER);
    // this.screen.scene.add(this.id);
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    renderImage(ctx, camera, this.img, this.x, this.y, this.size, this.size, 0);
    ctx.restore();
  }
}
