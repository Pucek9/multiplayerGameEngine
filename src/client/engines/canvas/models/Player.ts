import { PlayerModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

// const head = require('../../../games/balls/images/head.jpg');
const head = require('../../../games/robocop/images/robocop0/xxx.png');
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
      // this.img.onload = () => {
      //   this.patt = this.screen.renderer.ctx.createPattern(this.img, 'repeat');
      // };
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
    const ctx = this.screen.renderer.ctx;
    const camera = this.screen.camera;
    ctx.save();
    if (!this.isAlive()) {
      ctx.globalAlpha = 0.2;
    }
    camera.renderImage(ctx, this.img, this.x, this.y, this.size, this.size, -this.bodyDirection);
    ctx.restore();
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
