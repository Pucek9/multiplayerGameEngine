import BulletModel from '../../shared/models/BulletModel';

export default class Bullet extends BulletModel {
  private defaultSpeed = 5;
  private speed = 5;
  private distance = 10;
  private trajectory = 0;
  public power = 10;
  public range = 500;
  public owner: any;
  public fromX: number;
  public fromY: number;
  public targetX: number;
  public targetY: number;

  constructor(params: Partial<Bullet>) {
    super(params);
    Object.assign(this, params);
    Object.seal(this)
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

  update() {
    this.distance += this.speed;
    this.trajectory = Math.sqrt(
      Math.pow(this.targetX - this.fromX, 2) + Math.pow(this.targetY - this.fromY, 2),
    );
    this.x =
      this.targetX +
      ((this.trajectory - this.distance) / this.trajectory) * (this.fromX - this.targetX);
    this.y =
      this.targetY +
      ((this.trajectory - this.distance) / this.trajectory) * (this.fromY - this.targetY);
  }
}
