import ICircle from '../interfaces/ICircle';

export default class PlayerModel implements ICircle {
  public type: string = 'circle';

  public alive: boolean;
  public direction: number;
  public weapons = [];
  public selectedWeapon;

  constructor(
    public id: string,
    public name: string,
    public color: string,
    public x: number,
    public y: number,
    public size: number = 20,
    public speed: number = 3,
    public score: number = 0,
    public baseHp: number = 100,
    public hp?: number,
  ) {
    this.hp = this.baseHp;
    this.alive = false;
    this.direction = 0;
  }
}
