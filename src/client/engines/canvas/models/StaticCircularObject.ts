import { StaticCircularObjectModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

const cumin = require('../../../games/balls/images/cumin.jpg');

export default class StaticCircularObject extends StaticCircularObjectModel implements Updatable {
  public screen: ScreenModel;

  init(screen: ScreenModel) {
    this.screen = screen;
    screen.scene.add(this.id);
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
      this.size,
      0,
      2 * Math.PI,
    );
    renderer.ctx.fill();
    renderer.ctx.restore();
  }
}
