import ICircle from '../interfaces/ICircle';

export default abstract class StaticCircularObjectModel implements ICircle {
  shape = 'circle';
  x: number;
  y: number;
  size: number;
  color: string;
  direction: {
    dx: 0;
    dy: 0;
  };

  constructor(params: Partial<StaticCircularObjectModel>) {
    Object.assign(this, params);
  }
}
