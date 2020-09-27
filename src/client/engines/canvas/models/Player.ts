import { rgb } from '../../../../shared/canvasFilters';
import { convertImage, renderImage } from '../../../../shared/canvasHelpers';
import { getColors } from '../../../../shared/helpers';
import { PlayerModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

export default class Player extends PlayerModel implements Updatable {
  // public object: Mesh;
  // public objectLegs: Mesh;
  // private light: Lighting;
  private screen: ScreenModel;
  private img: HTMLImageElement;
  private imgLegs: HTMLImageElement;
  private patt: CanvasPattern;
  private headScale: number;
  private initiated = false;

  // setLight(light: Lighting) {
  // this.light = light;
  // }

  async init(screen: ScreenModel) {
    this.screen = screen;
    if (!this.isInitiated()) {
      this.img = new Image();
      this.imgLegs = new Image();
      // this.img.src = await this.screen.texture.getTexture(TEXTURE.HEAD);
      const src = await this.screen.texture.getTexture(TEXTURE.HEAD);
      this.headScale = this.screen.texture.getScale(TEXTURE.HEAD);
      const legsSrc = await this.screen.texture.getTexture(TEXTURE.LEGS);
      this.img.src = await convertImage(src, rgb, getColors(this.color));
      this.imgLegs.src = await convertImage(legsSrc, rgb, getColors(this.color));
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

  updateLegs(ctx: CanvasRenderingContext2D, camera) {
    ctx.save();
    if (!this.isAlive()) {
      ctx.globalAlpha = 0.2;
    }
    renderImage(
      ctx,
      camera,
      this.imgLegs,
      this.x,
      this.y,
      this.size,
      this.size,
      -Math.atan2(this.direction.dy, this.direction.dx),
    );
    ctx.restore();
  }

  updateBody(ctx, camera) {
    ctx.save();
    if (!this.isAlive()) {
      ctx.globalAlpha = 0.2;
    }
    renderImage(
      ctx,
      camera,
      this.img,
      this.x,
      this.y,
      this.size * this.headScale,
      this.size * this.headScale,
      -this.bodyDirection,
    );
    ctx.restore();
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    // if (this.isOnScene() && !this.isAlive()) {
    //   this.remove();
    // this.light?.setColor(0xff0000);
    // } else if (!this.isOnScene() && this.isAlive()) {
    //   this.addToScene();
    // this.light?.setColor(0xffffff);
    // } else {
    this.updateLegs(ctx, camera);
    this.updateBody(ctx, camera);
    // }
  }

  remove() {
    // this.screen.scene.delete(this.id);
    // this.screen.scene.remove(this.objectLegs);
  }
}
