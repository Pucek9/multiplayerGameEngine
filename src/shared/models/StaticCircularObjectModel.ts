import ICircle from '../interfaces/ICircle';

export default class StaticCircularObjectModel implements ICircle {
  public type = 'circle';

  constructor(public x: number, public y: number, public size: number, public color: string) {}
}
