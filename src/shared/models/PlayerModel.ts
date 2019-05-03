import ICircle from '../interfaces/ICircle';

export default class PlayerModel implements ICircle {
  shape: string = 'circle';

  alive = false;
  direction = 0;
  weapons = [];
  selectedWeapon;
  hp: number;
  speed: number;
  size: number;

  constructor(
    public id: string,
    public name: string,
    public color: string,
    public x: number,
    public y: number,
    public baseHp: number = 100,
    public baseSize: number = 20,
    public baseSpeed: number = 3,
    public score: number = 0,
  ) {
    this.hp = this.baseHp;
    this.speed = this.baseSpeed;
    this.size = this.baseSize;
  }
}
