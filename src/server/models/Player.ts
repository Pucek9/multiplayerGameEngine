import Bullet from './Bullet';
import PlayerModel from '../../shared/models/PlayerModel';
import Aura from './Aura';
// import Item from './weapons/Item';
import MouseCoordinates from '../../shared/apiModels/MouseCoordinates';

export default class Player extends PlayerModel {
  public keys: Set<string> = new Set();
  public aura: Aura;

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

  getAura() {
    this.aura = new Aura(this.x, this.y);
  }

  removeAura() {
    this.aura = null;
  }

  addScore(score: number) {
    this.score = this.score + score;
  }

  hitFromBullet(bullet: Bullet) {
    if (this.isAlive()) {
      this.hp -= bullet.power;
      bullet.effectOnPlayer(this);
      if (this.hp <= 0) {
        if (bullet.owner) {
          bullet.owner.addScore(100);
        }
        this.die();
      }
    }
  }

  goLeft() {
    this.x -= this.speed;
    if (this.aura) {
      this.aura.x = this.x;
    }
  }

  goRight() {
    this.x += this.speed;
    if (this.aura) {
      this.aura.x = this.x;
    }
  }

  goDown() {
    this.y += this.speed;
    if (this.aura) {
      this.aura.y = this.y;
    }
  }

  goUp() {
    this.y -= this.speed;
    if (this.aura) {
      this.aura.y = this.y;
    }
  }

  shoot(mouseClick: MouseCoordinates): Bullet[] {
    return this.selectedWeapon ? this.selectedWeapon.shoot(mouseClick, this) : [];
  }

  addWeapon(weapon) {
    this.weapons.push(weapon);
    this.selectedWeapon = this.weapons[this.weapons.length - 1];
  }

  selectWeapon(index: number) {
    if (this.weapons[index]) {
      this.selectedWeapon = this.weapons[index];
    }
  }
}
