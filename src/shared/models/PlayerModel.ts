import { CIRCLE } from '../constants';
import { Circle } from '../interfaces';
import { Direction } from './Direction';
export class PlayerModel implements Circle {
  shape = CIRCLE;
  alive = false;
  bodyDirection = 0;
  direction: Direction = { dx: 0, dy: 0 };
  moving = true;
  weapons = [];
  selectedWeapon;
  powers = [];
  selectedPower;
  hp: number;
  speed: number;
  size: number;
  energy: number;
  timeToRevive: number;
  cursor = { x: 0, y: 0, z: 0, down: false };

  constructor(
    public id: string,
    public name: string,
    public team: string,
    public color: string,
    public x: number,
    public y: number,
    public roomName: string,
    public baseHp: number = 100,
    public baseSize: number = 20,
    public baseSpeed: number = 3,
    public baseEnergy: number = 100,
    public baseTimeToRevive: number = 6,
    public kills: number = 0,
    public deaths: number = 0,
  ) {
    this.hp = this.baseHp;
    this.speed = this.baseSpeed;
    this.size = this.baseSize;
    this.energy = this.baseEnergy;
    this.timeToRevive = 0;
  }
}
