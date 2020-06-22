import { StaticCircularObjectModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class Item extends StaticCircularObjectModel implements Updatable {
  ready: boolean;
  time: number;
  id: number;
  private screen: ScreenModel;

  init(screen: ScreenModel) {
    this.screen = screen;
    screen.scene.add(this.id);
    this.update();
  }

  remove() {
    this.screen.scene.delete(this.id);
  }

  update() {
    if (this.ready) {
      const ctx = this.screen.renderer.ctx;
      const camera = this.screen.camera;
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      camera.drawCircle(ctx, this.x, this.y, this.size);
      ctx.fill();
      ctx.restore();
    }
  }
}
