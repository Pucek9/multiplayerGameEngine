import PlayerModel from '../../shared/models/PlayerModel';
import Direction from '../../shared/models/Direction';
import Bullet from './Bullet';
import AidKit from './AidKit';
import { Angle } from '../services/CollisionDetector';

export default class Player extends PlayerModel {
  public keys: Set<string> = new Set();
  public regeneration = 2.5;

  isAlive() {
    return this.alive;
  }

  die(withDieCounter = true) {
    if (withDieCounter) {
      this.deaths += 1;
    }
    this.timeToRevive = this.baseTimeToRevive;
    this.alive = false;
    this.speed = this.baseSpeed;
    this.size = this.baseSize;
    this.cursor.down = false;
  }

  revive() {
    if (this.canRevive()) {
      this.alive = true;
      this.hp = this.baseHp;
      this.energy = this.baseEnergy;
    }
  }

  setMouseDown() {
    this.cursor.down = true;
  }

  setMouseUp() {
    this.cursor.down = false;
  }

  isMouseDown() {
    return this.cursor.down;
  }

  regenerate(value?: number) {
    this.takeAidKit({ energy: value ?? this.regeneration });
  }

  usePower(game) {
    if (this.isAlive()) {
      this.selectedPower?.use({ owner: this, game });
    }
  }

  useClickPower(game) {
    if (this.isAlive()) {
      this.selectedPower?.useClickPower({ owner: this, game });
    }
  }

  releasePower(game) {
    this.selectedPower?.release({ owner: this, game });
  }

  addKills(score: number) {
    this.kills += score;
  }

  hitFromBullet(bullet: Bullet, angle?: Angle) {
    if (this.isAlive()) {
      // console.log(bullet);
      this.hp -= bullet.power;
      bullet.effectOnPlayer(this);
      bullet.hit(angle);
      if (this.hp <= 0) {
        this.hp = 0;
        if (bullet.owner?.team !== this.team) {
          bullet.owner.addKills(1);
        }
        this.die();
      }
    }
  }

  shoot(game) {
    this.selectedWeapon?.shoot(
      {
        owner: this,
        fromX: this.x + this.size * Math.cos(this.bodyDirection),
        fromY: this.y + this.size * Math.sin(this.bodyDirection),
        targetX: this.cursor.x,
        targetY: this.cursor.y,
        dir: this.direction,
        size: this.size,
      },
      game,
    );
  }

  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  selectWeapon(index: number) {
    if (this.weapons[index]) {
      this.setMouseUp();
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
    if (aidKit.size) {
      this.size = this.baseSize;
    }
    if (aidKit.speed) {
      this.speed = this.baseSpeed;
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

  go(rememberDir: Direction = this.direction) {
    this.moving = true;
    this.x += this.direction.dx;
    this.y += this.direction.dy;
    this.cursor.x += this.direction.dx;
    this.cursor.y += this.direction.dy;
    this.direction = rememberDir;
  }

  isMoving() {
    return this.direction.dx !== 0 || this.direction.dy !== 0;
  }

  decreaseTimeToRevive(time: number = 1) {
    if (this.timeToRevive > 0) {
      this.timeToRevive -= time;
    }
  }

  canRevive() {
    return this.timeToRevive === 0;
  }

  updateCursor({ x, y }: { x: number; y: number }) {
    this.cursor.x = x;
    this.cursor.y = y;
  }

  updateDirection() {
    const dx = this.cursor.x - this.x;
    const dy = this.cursor.y - this.y;
    this.bodyDirection = Math.atan2(dy, dx);
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
