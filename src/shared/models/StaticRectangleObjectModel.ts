import IRectangle from '../interfaces/IRectangle';

export default class StaticRectangleObjectModel implements IRectangle {
  shape = 'rectangle';
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  deg = 0;
  speed = 0;
  direction = { dx: 0, dy: 0 };

  constructor(params: Partial<StaticRectangleObjectModel>) {
    Object.assign(this, params);
  }
}
