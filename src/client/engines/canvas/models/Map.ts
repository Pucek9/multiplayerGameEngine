import { MapModel, PlayerModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';

export default class Map implements Updatable, MapModel {
  public screen: ScreenModel;
  public src: string;
  public img: HTMLImageElement;
  mapName: string;
  width: number;
  height: number;
  floor: string;

  constructor(props: MapModel) {
    Object.assign(this, props);
    this.img = new Image();
    this.img.src = require(`../../../games/balls/images/${this.floor}.jpg`);
  }

  init(screen: ScreenModel) {
    this.screen = screen;
    this.screen.scene.add(this);
  }

  // update() {
  //   this.screen.renderer.ctx.drawImage(
  //     this.img,
  //     this.screen.renderer.domElement.width,
  //     this.screen.renderer.domElement.height,
  //   );
  // }
  update() {
    this.screen.renderer.ctx.drawImage(
      this.img,
      this.screen.renderer.domElement.width / 2 - this.screen.camera.x,
      this.screen.renderer.domElement.height / 2 - this.screen.camera.y,
    );
  }
}
