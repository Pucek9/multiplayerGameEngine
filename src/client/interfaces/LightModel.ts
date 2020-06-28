import CursorModel from './CursorModel';
import Model3D from './Model3D';
import Updatable from './Updatable';

export interface LightModel extends Updatable {
  light;
  source?: Model3D;
  dest?: CursorModel;

  init(params);

  remove();

  setColor(color: number);
}
