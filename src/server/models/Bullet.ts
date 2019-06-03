import BulletModel from '../../shared/models/BulletModel';

export default class Bullet extends BulletModel {
  private defaultSpeed = 5;
  private speed = 5;
  private distance = 10;
  power = 10;
  range = 500;
  owner: any;
  fromX: number;
  fromY: number;
  targetX: number;
  targetY: number;
  active = true;
  reverseX = 1;
  reverseY = 1;
  // dx: number
  // dy: number

  constructor(params: Partial<Bullet>) {
    super(params);
    Object.assign(this, params);
    Object.seal(this);
  }

  decreaseSpeed(value: number = 1) {
    if (this.speed > value) {
      this.speed -= value;
    } else {
      this.speed = 1;
    }
  }

  increaseSpeed(value: number = 1) {
    if (this.defaultSpeed > this.speed + value) {
      this.speed += value;
    } else {
      this.speed = this.defaultSpeed;
    }
  }

  isStillInAir(): boolean {
    return this.distance < this.range;
  }

  updatePosition() {
    this.additionalAction();
    this.distance += this.speed;
    const a = Math.sqrt(
      Math.pow(this.targetX - this.fromX, 2) + Math.pow(this.targetY - this.fromY, 2),
    );
    const b = (a - this.distance) / a;
    this.x = this.targetX + this.reverseX * b * (this.fromX - this.targetX);
    this.y = this.targetY + this.reverseY * b * (this.fromY - this.targetY);
    if (!this.isStillInAir()) {
      this.deactivate();
    }
  }

  additionalAction() {}

  effectOnPlayer(player) {}

  hit() {
    this.deactivate();
  }

  deactivate() {
    this.active = false;
  }

  isActive() {
    return this.active;
  }
}
