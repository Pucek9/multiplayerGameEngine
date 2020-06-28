import { Color, Light } from 'three';

import CursorModel from '../../../../interfaces/CursorModel';
import { LightModel } from '../../../../interfaces/LightModel';
import Model3D from '../../../../interfaces/Model3D';
import ScreenModel from '../../../../interfaces/ScreenModel';

export abstract class BaseLight implements LightModel {
  light: Light;
  source?: Model3D;
  dest?: CursorModel;

  constructor(public screen: ScreenModel) {}

  update() {}

  abstract init(params);

  remove() {
    this.screen.scene.remove(this.light);
  }

  setColor(color: number) {
    this.light.color = new Color(color);
  }
}
