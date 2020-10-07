import { drawRotatedRectangle, drawUnRotatedRectangle } from '../../../../shared/canvasHelpers';
import { RectangleObjectModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

export default class RectangleObject extends RectangleObjectModel implements Updatable {
  screen: ScreenModel;
  private img: HTMLImageElement;
  private patt: CanvasPattern;

  async init(screen: ScreenModel) {
    this.screen = screen;
    // screen.scene.add(this.id);
    this.img = new Image();
    this.img.src = await this.screen.texture.getTextureSrc(TEXTURE.BOX);
    this.img.onload = () => {
      this.patt = (this.screen.renderer as CanvasRenderer).ctx.createPattern(this.img, 'repeat');
    };
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    drawRotatedRectangle(ctx, camera, this.x, this.y, this.width, this.height, this.deg);
    ctx.fillStyle = this.patt;
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
