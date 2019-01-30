import ICircle from '../../shared/interfaces/ICircle';

export default class Aura implements ICircle {
  public type: string = 'circle';

  constructor(public x: number, public y: number, public size: number = 70) {}
}
