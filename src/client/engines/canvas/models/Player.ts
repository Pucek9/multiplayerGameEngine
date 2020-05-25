import { PlayerModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

const head = require('../../../games/balls/images/head.jpg');
// const texture = new TextureLoader().load(head);

export default class Player extends PlayerModel implements Updatable {
  // public object: Mesh;
  // public objectLegs: Mesh;
  // private light: Lighting;
  private screen: ScreenModel;
  private img: HTMLImageElement;
  private patt: CanvasPattern;

  private initiated = false;

  // setLight(light: Lighting) {
  // this.light = light;
  // }

  init(screen: ScreenModel) {
    this.screen = screen;
    if (!this.isInitiated()) {
      this.img = new Image();
      this.img.src = head;
      this.patt = this.screen.renderer.ctx.createPattern(this.img, 'no-repeat');
      this.initiated = true;
    }
  }

  isInitiated() {
    return this.initiated;
  }

  setAsCurrent() {}

  isOnScene() {
    return this.screen.scene.has(this.id);
  }

  isAlive() {
    return this.alive;
  }

  addToScene() {
    this.screen.scene.add(this.id);
    // this.screen.scene.add(this.objectLegs);
  }

  setAsEnemy() {}

  updateBody() {
    const renderer = this.screen.renderer;
    const camera = this.screen.camera;
    renderer.ctx.save();
    if (!this.isAlive()) {
      renderer.ctx.globalAlpha = 0.2;
    }
    renderer.ctx.beginPath();
    renderer.ctx.arc(
      renderer.domElement.width / 2 - (camera.x - this.x),
      renderer.domElement.height / 2 + (camera.y - this.y),
      this.size,
      0,
      2 * Math.PI,
    );
    renderer.ctx.fillStyle = this.color;
    // renderer.ctx.fillStyle = this.patt;
    renderer.ctx.fill();
    renderer.ctx.restore();
  }

  update() {
    if (this.isOnScene() && !this.isAlive()) {
      this.remove();
      // this.light?.setColor(0xff0000);
    } else if (!this.isOnScene() && this.isAlive()) {
      this.addToScene();
      // this.light?.setColor(0xffffff);
    } else {
      this.updateBody();
    }
  }

  remove() {
    this.screen.scene.delete(this.id);
    // this.screen.scene.remove(this.objectLegs);
  }
}
