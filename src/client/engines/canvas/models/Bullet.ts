import { drawCircle } from '../../../../shared/canvasHelpers';
import { PULL, PUSH, REVERSE_BULLETS, SLOW_BULLETS } from '../../../../shared/constants';
import { BulletModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { optionsService } from '../../../store/store';
import { CanvasRenderer } from '../Game2D';

export default class Bullet extends BulletModel implements Updatable {
  protected transparentBullets = [PUSH, PULL, SLOW_BULLETS, REVERSE_BULLETS];
  private transparency = this.transparentBullets.includes(this.type);
  screen: ScreenModel;
  init(screen: ScreenModel) {
    const options = optionsService.getState();
    this.screen = screen;
    // screen.scene.add(this.id);
    this.update();
  }

  remove() {
    // (this.screen.scene as Set<string>).delete(this.id);
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    ctx.fillStyle = this.color;
    if (this.transparency) {
      ctx.globalAlpha = 0.2;
    }
    ctx.beginPath();
    drawCircle(ctx, camera, this.x, this.y, this.size);
    ctx.fill();
    ctx.restore();
  }
}
