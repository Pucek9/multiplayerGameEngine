import { BoxGeometry, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

import { degToRad } from '../../../../shared/helpers';
import { StaticRectangleObjectModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class StaticRectangleObject extends StaticRectangleObjectModel implements Updatable {
  screen: ScreenModel;
  private img: HTMLImageElement;
  private patt: CanvasPattern;

  init(screen: ScreenModel) {
    this.screen = screen;
    screen.scene.add(this.id);
    this.img = new Image();
    this.img.src = require('../../../games/balls/images/box.png');
    this.img.onload = () => {
      this.patt = this.screen.renderer.ctx.createPattern(this.img, 'repeat');
    };
  }

  update() {
    const ctx = this.screen.renderer.ctx;
    const camera = this.screen.camera;
    ctx.save();
    this.deg === 0
      ? camera.drawUnRotatedRectangle(ctx, this.x, this.y, this.width, this.height)
      : camera.drawRotatedRectangle(ctx, this.x, this.y, this.width, this.height, this.deg);
    ctx.fillStyle = this.patt;
    ctx.fill();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
