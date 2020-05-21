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
      const renderer = this.screen.renderer;
      const camera = this.screen.camera;
      renderer.ctx.save();
      renderer.ctx.fillStyle = this.color;
      renderer.ctx.beginPath();
      renderer.ctx.arc(
        renderer.domElement.width / 2 - (camera.x - this.x),
        renderer.domElement.height / 2 + (camera.y - this.y),
        10,
        0,
        2 * Math.PI,
      );
      renderer.ctx.fill();
      renderer.ctx.restore();
    }
  }
}
