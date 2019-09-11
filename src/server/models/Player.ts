import Bullet from './Bullet';
import PlayerModel from '../../shared/models/PlayerModel';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';
import AidKit from './AidKit';

export default class Player extends PlayerModel {
  public keys: Set<string> = new Set();
  public regeneration = 2.5;

  isAlive() {
    return this.alive;
  }

  die() {
    this.deaths += 1;
    this.alive = false;
    this.speed = this.baseSpeed;
    this.size = this.baseSize;
  }

  revive() {
    this.alive = true;
    this.hp = this.baseHp;
    this.energy = this.baseEnergy;
  }

  regenerate(value?: number) {
    this.takeAidKit({ energy: value || this.regeneration });
  }

  usePower(game, mouseClick?: MouseCoordinates) {
    if (this.isAlive()) {
      this.selectedPower.use({ owner: this, game, mouseClick });
    }
  }

  releasePower(game) {
    this.selectedPower.release({ owner: this, game });
  }

  addKills(score: number) {
    this.kills += score;
  }

  hitFromBullet(bullet: Bullet, angle?) {
    if (this.isAlive()) {
      this.hp -= bullet.power;
      bullet.effectOnPlayer(this);
      bullet.hit(angle);
      if (this.hp <= 0) {
        this.hp = 0;
        if (bullet.owner) {
          bullet.owner.addKills(1);
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

  shoot(mouseClick: MouseCoordinates): Bullet[] {
    return this.selectedWeapon
      ? this.selectedWeapon.shoot({
          ...mouseClick,
          owner: this,
          fromX: this.x,
          fromY: this.y,
          // size: this.size,
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

  takeAidKit(aidKit: Partial<AidKit>) {
    if (aidKit.hp) {
      if (this.hp + aidKit.hp > this.baseHp) {
        this.hp = this.baseHp;
      } else {
        this.hp += aidKit.hp;
      }
    }
    if (aidKit.energy) {
      if (this.energy + aidKit.energy > this.baseEnergy) {
        this.energy = this.baseEnergy;
      } else {
        this.energy += aidKit.energy;
      }
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

  decreaseSpeedToDefault(value: number = 0.2) {
    if (this.speed - value > this.baseSpeed) {
      this.speed -= value;
    } else {
      this.speed = this.baseSpeed;
    }
  }

  increaseSpeedTo(maxSpeed: number, value: number = 0.2) {
    if (maxSpeed > this.speed + value) {
      this.speed += value;
    } else {
      this.speed = maxSpeed;
    }
  }

  isMoving() {
    const moveKeys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'W', 'S', 'A', 'D'];
    return moveKeys.some(key => this.keys.has(key));
    // return (
    //   this.keys.has('ArrowRight') ||
    //   this.keys.has('ArrowLeft') ||
    //   this.keys.has('ArrowUp') ||
    //   this.keys.has('ArrowDown') ||
    //   this.keys.has('W') ||
    //   this.keys.has('S') ||
    //   this.keys.has('A') ||
    //   this.keys.has('D')
    // );
  }
}
