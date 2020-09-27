import { drawCircle } from '../../../../shared/canvasHelpers';
import { StaticCircularObjectModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

export default class StaticCircularObject extends StaticCircularObjectModel implements Updatable {
  public screen: ScreenModel;
  private img: HTMLImageElement;
  private patt: CanvasPattern;

  async init(screen: ScreenModel) {
    this.screen = screen;
    // screen.scene.add(this.id);
    this.img = new Image();
    this.img.src = await this.screen.texture.getTextureSrc(TEXTURE.CUMIN);
    this.img.onload = () => {
      this.patt = (this.screen.renderer as CanvasRenderer).ctx.createPattern(this.img, 'repeat');
    };
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    ctx.beginPath();
    drawCircle(ctx, camera, this.x, this.y, this.size);
    ctx.fillStyle = this.patt;
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
