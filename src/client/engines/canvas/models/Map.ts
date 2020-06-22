import { renderMap } from '../../../../shared/canvasHelpers';
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
    this.screen.scene.add(this.id);
  }

  update() {
    const ctx = this.screen.renderer.ctx;
    const camera = this.screen.camera;
    ctx.save();
    renderMap(ctx, camera, this.img, this.width, this.height);
    ctx.restore();
  }
}
