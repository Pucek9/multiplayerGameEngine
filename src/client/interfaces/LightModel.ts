import CursorModel from './CursorModel';
import Updatable from './Updatable';

export interface Source {
  x: number;
  y: number;
}

export interface LightModel extends Updatable {
  light;
  source?: Source;
  dest?: CursorModel;

  init(params);

  remove();

  setColor(color: number);
}
