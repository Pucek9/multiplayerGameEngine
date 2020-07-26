import { drawCircle } from '../../../../shared/canvasHelpers';
import { StaticCircularObjectModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

export default class Item extends StaticCircularObjectModel implements Updatable {
  ready: boolean;
  time: number;
  id: number;
  private screen: ScreenModel;

  init(screen: ScreenModel) {
    this.screen = screen;
    // screen.scene.add(this.id);
    this.update();
  }

  remove() {
    // this.screen.scene.delete(this.id);
  }

  update() {
    if (this.ready) {
      const ctx = (this.screen.renderer as CanvasRenderer).ctx;
      const camera = this.screen.camera;
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.beginPath();
      drawCircle(ctx, camera, this.x, this.y, this.size);
      ctx.fill();
      ctx.restore();
    }
  }
}
