import { degToRad, rotatePoint } from '../../../../../shared/helpers';
import { MapModel, PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';

export default class StaticCamera implements CameraModel {
  public x = 0;
  public y = 0;

  map;
  activePlayer;
  init({ activePlayer, map }: { activePlayer: PlayerModel; map: MapModel }) {
    this.activePlayer = activePlayer;
    this.map = map;
    this.x = activePlayer.x;
    this.y = activePlayer.y;
  }

  update(renderer) {
    this.x = this.activePlayer.x;
    this.y = this.activePlayer.y;
    renderer.ctx.translate(
      renderer.domElement.width / 2 - (this.x - this.x),
      renderer.domElement.height / 2 + (this.x - this.x),
    );
  }

  drawCircle(ctx, x, y, size) {
    ctx.arc(-(this.x - x), this.y - y, size, 0, 2 * Math.PI);
  }

  drawUnRotatedRectangle(ctx, x, y, width, height) {
    ctx.rect(-(this.x - x), this.y - y, width, -height);
  }

  renderImage(ctx, img, x, y, width, height, deg) {
    ctx.translate(-(this.x - x), this.y - y);
    ctx.rotate(deg);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
  }

  renderMap(ctx, img, width, height) {
    ctx.drawImage(img, -this.x - width / 2, this.y - height / 2);
  }

  drawRotatedRectangle(ctx, x, y, width, height, deg) {
    const realX = -(this.x - x),
      realY = +(this.y - y),
      centerX = realX + width / 2,
      centerY = realY + -height / 2,
      w = width,
      h = -height,
      angleOfRad = -degToRad(deg);

    const leftTop = [realX, realY],
      rightTop = [realX + w, realY],
      rightBottom = [realX + w, realY + h],
      leftBottom = [realX, realY + h];

    const rotateLeftTop = rotatePoint([centerX, centerY], leftTop, angleOfRad),
      rotateRightTop = rotatePoint([centerX, centerY], rightTop, angleOfRad),
      rotateRightBottom = rotatePoint([centerX, centerY], rightBottom, angleOfRad),
      rotateLeftBottom = rotatePoint([centerX, centerY], leftBottom, angleOfRad);

    ctx.beginPath();
    ctx.moveTo(rotateLeftTop.x, rotateLeftTop.y);
    ctx.lineTo(rotateRightTop.x, rotateRightTop.y);
    ctx.lineTo(rotateRightBottom.x, rotateRightBottom.y);
    ctx.lineTo(rotateLeftBottom.x, rotateLeftBottom.y);
    ctx.closePath();
  }
  wheel() {}
  remove() {}
  handleResize() {}
}
