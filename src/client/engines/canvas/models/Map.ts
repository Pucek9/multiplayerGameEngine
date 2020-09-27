import { renderMap } from '../../../../shared/canvasHelpers';
import { MapModel } from '../../../../shared/models';

import { TEXTURE } from '../../../assets/textures';
import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { CanvasRenderer } from '../Game2D';

export default class Map implements Updatable, MapModel {
  public screen: ScreenModel;
  public src: string;
  public img: HTMLImageElement;
  mapName: string;
  width: number;
  height: number;
  floor: TEXTURE;

  constructor(props: MapModel) {
    Object.assign(this, props);
    this.img = new Image();
  }

  async init(screen: ScreenModel) {
    this.screen = screen;
    this.img.src = await screen.texture.getTextureSrc(TEXTURE[this.floor]);
  }

  update() {
    const ctx = (this.screen.renderer as CanvasRenderer).ctx;
    const camera = this.screen.camera;
    ctx.save();
    renderMap(ctx, camera, this.img, this.width, this.height);
    ctx.restore();
  }
}
