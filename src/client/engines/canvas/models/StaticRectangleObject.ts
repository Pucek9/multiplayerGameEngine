import { BoxGeometry, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

import { degToRad } from '../../../../shared/helpers';
import { StaticRectangleObjectModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

const box = require('../../../games/balls/images/box.png');

export default class StaticRectangleObject extends StaticRectangleObjectModel implements Updatable {
  screen: ScreenModel;

  init(screen: ScreenModel) {
    this.screen = screen;
    screen.scene.add(this.id);
  }

  update() {
    if (this.deg === 0) {
      this.renderUnRotated();
    } else {
      this.renderRotated();
    }
  }

  renderUnRotated() {
    const renderer = this.screen.renderer;
    const camera = this.screen.camera;
    renderer.ctx.save();
    renderer.ctx.fillStyle = this.color;
    renderer.ctx.fillRect(
      renderer.domElement.width / 2 - (camera.x - this.x),
      renderer.domElement.height / 2 + (camera.y - this.y),
      this.width,
      -this.height,
    );
    renderer.ctx.restore();
  }

  renderRotated() {
    const ctx = this.screen.renderer.ctx;
    this.getPathOfShape();
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  getPathOfShape() {
    function rotatePoint(pivot, point, angle) {
      const x = Math.round(
          Math.cos(angle) * (point[0] - pivot[0]) -
            Math.sin(angle) * (point[1] - pivot[1]) +
            pivot[0],
        ),
        y = Math.round(
          Math.sin(angle) * (point[0] - pivot[0]) +
            Math.cos(angle) * (point[1] - pivot[1]) +
            pivot[1],
        );
      return { x: x, y: y };
    }

    function degToRad(deg) {
      return (deg * Math.PI) / 180;
    }

    const angleOfDeg = this.deg,
      x = this.screen.renderer.domElement.width / 2 - (this.screen.camera.x - this.x),
      y = this.screen.renderer.domElement.height / 2 + (this.screen.camera.y - this.y),
      centerX = x + this.width / 2,
      centerY = y + -this.height / 2,
      w = this.width,
      h = -this.height,
      angleOfRad = -degToRad(angleOfDeg);

    const leftTop = [x, y],
      rightTop = [x + w, y],
      rightBottom = [x + w, y + h],
      leftBottom = [x, y + h];

    const rotateLeftTop = rotatePoint([centerX, centerY], leftTop, angleOfRad),
      rotateRightTop = rotatePoint([centerX, centerY], rightTop, angleOfRad),
      rotateRightBottom = rotatePoint([centerX, centerY], rightBottom, angleOfRad),
      rotateLeftBottom = rotatePoint([centerX, centerY], leftBottom, angleOfRad);

    const ctx = this.screen.renderer.ctx;
    ctx.beginPath();
    ctx.moveTo(rotateLeftTop.x, rotateLeftTop.y);
    ctx.lineTo(rotateRightTop.x, rotateRightTop.y);
    ctx.lineTo(rotateRightBottom.x, rotateRightBottom.y);
    ctx.lineTo(rotateLeftBottom.x, rotateLeftBottom.y);
    ctx.closePath();
  }
}
