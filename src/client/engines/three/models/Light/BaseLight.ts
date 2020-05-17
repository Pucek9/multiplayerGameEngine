import { Color, Light } from 'three';

import CursorModel from '../../../../interfaces/CursorModel';
import { LightModel, Source } from '../../../../interfaces/LightModel';
import ScreenModel from '../../../../interfaces/ScreenModel';

export abstract class BaseLight implements LightModel {
  light: Light;
  source?: Source;
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
