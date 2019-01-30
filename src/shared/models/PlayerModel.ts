import ICircle from '../interfaces/ICircle';

export default class PlayerModel implements ICircle {
  public type = 'circle';

  public active: boolean;
  public alive: boolean;
  public direction: number;

  constructor(
    public id: number,
    public name: string,
    public color: string,
    public x: number,
    public y: number,
    public size: number = 32,
    public speed: number = 3,
    public score: number = 0,
    public hp: number = 100
  ) {
    this.active = false;
    this.alive = true;
    this.direction = 0;
  }
}
