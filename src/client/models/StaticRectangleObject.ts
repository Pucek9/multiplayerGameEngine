import StaticRectangleObjectModel from '../../shared/models/StaticRectangleObjectModel';
import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../types/ScreenModel';
import { BoxGeometry, Math, Mesh, MeshPhongMaterial, TextureLoader } from 'three';

const box = require('../games/balls/images/box.png');

export default class StaticRectangleObject extends StaticRectangleObjectModel
  implements IUpdatable {
  private object: Mesh;

  init(screen: ScreenModel) {
    const texture = new TextureLoader().load(box);
    const geometry = new BoxGeometry(this.width, this.height, this.depth);
    const material = new MeshPhongMaterial({
      map: texture,
      color: this.color,
    });
    this.object = new Mesh(geometry, material);

    this.object.rotation.z = Math.degToRad(this.deg);

    this.object.position.x = this.x + this.width / 2;
    this.object.position.y = this.y + this.height / 2;
    this.object.position.z = this.z + this.depth / 2;

    this.object.castShadow = true;
    this.object.receiveShadow = true;
    screen.scene.add(this.object);
  }

  update() {}

  //
  // renderUnRotated(activePlayer: PlayerModel) {
  // this.screen.ctx.fillStyle = this.color;
  // this.screen.ctx.fillRect(
  //     this.screen.canvas.width / 2 - (activePlayer.x - this.x),
  //     this.screen.canvas.height / 2 - (activePlayer.y - this.y),
  //     this.width,
  //     this.height
  // );
  // }

  // renderRotated(activePlayer: PlayerModel) {
  // this.getPathOfShape(activePlayer);
  // this.screen.ctx.save();
  // this.screen.ctx.fillStyle = this.color;
  // this.screen.ctx.fill();
  // this.screen.ctx.restore()
  // }

  // getPathOfShape(activePlayer) {
  //
  //     function rotatePoint(pivot, point, angle) {
  //         let x = Math.round((Math.cos(angle) * (point[0] - pivot[0])) -
  //             (Math.sin(angle) * (point[1] - pivot[1])) +
  //             pivot[0]),
  //             y = Math.round((Math.sin(angle) * (point[0] - pivot[0])) +
  //                 (Math.cos(angle) * (point[1] - pivot[1])) +
  //                 pivot[1]);
  //         return {x: x, y: y};
  //     }
  //
  //     function degToRad(deg) {
  //         return deg * Math.PI / 180;
  //     }
  //
  //     const angleOfDeg = this.deg,
  //         x = this.screen.canvas.width / 2 - (activePlayer.x - this.x),
  //         y = this.screen.canvas.height / 2 - (activePlayer.y - this.y),
  //         centerX = x + this.width / 2,
  //         centerY = y + this.height / 2,
  //         w = this.width,
  //         h = this.height,
  //         angleOfRad = degToRad(angleOfDeg);
  //
  //     const leftTop = [x, y],
  //         rightTop = [x + w, y],
  //         rightBottom = [x + w, y + h],
  //         leftBottom = [x, y + h];
  //
  //     const rotateLeftTop = rotatePoint([centerX, centerY], leftTop, angleOfRad),
  //         rotateRightTop = rotatePoint([centerX, centerY], rightTop, angleOfRad),
  //         rotateRightBottom = rotatePoint([centerX, centerY], rightBottom, angleOfRad),
  //         rotateLeftBottom = rotatePoint([centerX, centerY], leftBottom, angleOfRad);
  //
  //     this.screen.ctx.beginPath();
  //     this.screen.ctx.moveTo(rotateLeftTop.x, rotateLeftTop.y);
  //     this.screen.ctx.lineTo(rotateRightTop.x, rotateRightTop.y);
  //     this.screen.ctx.lineTo(rotateRightBottom.x, rotateRightBottom.y);
  //     this.screen.ctx.lineTo(rotateLeftBottom.x, rotateLeftBottom.y);
  //     this.screen.ctx.closePath();
  // }
}
