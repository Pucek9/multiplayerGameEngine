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
    screen.scene.add(this);
    this.update();
  }

  remove() {
    this.screen.scene.delete(this);
  }

  update() {
    const renderer = this.screen.renderer;
    const camera = this.screen.camera;
    renderer.ctx.save();
    renderer.ctx.fillStyle = this.color;
    renderer.ctx.beginPath();
    renderer.ctx.arc(
      renderer.domElement.width / 2 - (camera.x - this.x),
      renderer.domElement.height / 2 + (camera.y - this.y),
      2,
      0,
      2 * Math.PI,
    );
    renderer.ctx.fill();
    renderer.ctx.restore();
  }
}
