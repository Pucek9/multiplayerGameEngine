import Bullet from './Bullet';
import PlayerModel from '../../shared/models/PlayerModel';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import AidKit from './AidKit';

export default class Player extends PlayerModel {
  public keys: Set<string> = new Set();

  isAlive() {
    return this.alive;
  }

  die() {
    this.alive = false;
    this.speed = this.baseSpeed;
    this.size = this.baseSize;
  }

  revive() {
    this.alive = true;
    this.hp = this.baseHp;
  }

  usePower(mouseClick?) {
    this.selectedPower.use(this, mouseClick);
  }

  releasePower() {
    this.selectedPower.release();
  }

  addScore(score: number) {
    this.score = this.score + score;
  }

  hitFromBullet(bullet: Bullet, angle?) {
    if (this.isAlive()) {
      this.hp -= bullet.power;
      bullet.effectOnPlayer(this);
      bullet.hit(angle);
      if (this.hp <= 0) {
        this.hp = 0;
        if (bullet.owner) {
          bullet.owner.addScore(100);
        }
        this.die();
      }
    }
  }

  goLeft() {
    this.x -= this.speed;
  }

  goRight() {
    this.x += this.speed;
  }

  goDown() {
    this.y += this.speed;
  }

  goUp() {
    this.y -= this.speed;
  }

  shoot(mouseClick: MouseCoordinates, game): Bullet[] {
    return this.selectedWeapon
      ? this.selectedWeapon.shoot({
          ...mouseClick,
          owner: this,
          fromX: this.x,
          fromY: this.y,
          size: this.size,
        })
      : [];
  }

  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  selectWeapon(index: number) {
    if (this.weapons[index]) {
      this.selectedWeapon = this.weapons[index];
    }
  }

  addAndSelectWeapon(weapon) {
    this.addWeapon(weapon);
    this.selectWeapon(this.weapons.length - 1);
  }

  addPower(power) {
    this.powers.push(power);
  }

  selectPower(index: number) {
    if (this.powers[index]) {
      this.selectedPower = this.powers[index];
    }
  }

  addAndSelectPower(power) {
    this.addPower(power);
    this.selectPower(this.powers.length - 1);
  }

  takeAidKit(aidKit: AidKit) {
    if (this.hp + aidKit.hp > this.baseHp) {
      this.hp = this.baseHp;
    } else {
      this.hp += aidKit.hp;
    }

    if (this.energy + aidKit.energy > this.baseEnergy) {
      this.energy = this.baseEnergy;
    } else {
      this.energy += aidKit.energy;
    }
  }

  hasEnoughEnergy(cost: number) {
    return this.energy >= cost;
  }

  useEnergy(cost: number) {
    this.energy -= cost;
  }

  tryUseEnergy(cost: number) {
    if (this.hasEnoughEnergy(cost)) {
      this.useEnergy(cost);
      return true;
    }
    return false;
  }
}
