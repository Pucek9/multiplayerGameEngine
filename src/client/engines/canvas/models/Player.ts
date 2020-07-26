import { renderImage } from '../../../../shared/canvasHelpers';
import { PlayerModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

// const head = require('../../../assets/textures/games/balls/head.png').default;
// const legs = require('../../../assets/textures/games/balls/2d/legs.png');

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

  async init(screen: ScreenModel) {
    this.screen = screen;
    if (!this.isInitiated()) {
      this.img = new Image();
      this.img.src = await this.screen.texture.getTexture(TEXTURE.HEAD);
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

  // isOnScene() {
  //   return (this.screen.scene as Set<string>).has(this.id);
  // }
  //
  isAlive() {
    return this.alive;
  }

  addToScene() {
    // this.screen.scene.add(this.id);
    // this.screen.scene.add(this.objectLegsId);
  }

  setAsEnemy() {}

  updateBody() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    if (!this.isAlive()) {
      ctx.globalAlpha = 0.2;
    }
    renderImage(ctx, camera, this.img, this.x, this.y, this.size, this.size, -this.bodyDirection);
    ctx.restore();
  }

  update() {
    // if (this.isOnScene() && !this.isAlive()) {
    //   this.remove();
    // this.light?.setColor(0xff0000);
    // } else if (!this.isOnScene() && this.isAlive()) {
    //   this.addToScene();
    // this.light?.setColor(0xffffff);
    // } else {
    this.updateBody();
    // }
  }

  remove() {
    // this.screen.scene.delete(this.id);
    // this.screen.scene.remove(this.objectLegs);
  }
}
