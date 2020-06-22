import { PULL, PUSH } from '../../../../shared/constants';
import { BulletModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { optionsService } from '../../../store/store';

export default class Bullet extends BulletModel implements Updatable {
  private transparency = this.type === PUSH || this.type === PULL;
  screen: ScreenModel;
  init(screen: ScreenModel) {
    const options = optionsService.getState();
    this.screen = screen;
    screen.scene.add(this.id);
    this.update();
  }

  remove() {
    this.screen.scene.delete(this.id);
  }

  update() {
    const ctx = this.screen.renderer.ctx;
    const camera = this.screen.camera;
    ctx.save();
    ctx.fillStyle = this.color;
    if (this.transparency) {
      ctx.globalAlpha = 0.2;
    }
    ctx.beginPath();
    camera.drawCircle(ctx, this.x, this.y, this.size);
    ctx.fill();
    ctx.restore();
  }
}
