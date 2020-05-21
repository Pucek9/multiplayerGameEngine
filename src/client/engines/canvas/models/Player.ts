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

  private initiated = false;

  // setLight(light: Lighting) {
  // this.light = light;
  // }

  init(screen: ScreenModel) {
    this.screen = screen;
    if (!this.isInitiated()) {
      // this.object.name = this.id;
      // this.object.position.z = this.size;
      // this.object.receiveShadow = true;
      this.initiated = true;
    }
  }

  isInitiated() {
    return this.initiated;
  }

  setAsCurrent() {}

  isOnScene() {
    return this.screen.scene.has(this);
  }

  isAlive() {
    return this.alive;
  }

  addToScene() {
    this.screen.scene.add(this);
    // this.screen.scene.add(this.objectLegs);
  }

  setAsEnemy() {}

  updateBody() {
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
    this.screen.scene.delete(this);
    // this.screen.scene.remove(this.objectLegs);
  }
}
