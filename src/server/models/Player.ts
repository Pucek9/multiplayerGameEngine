import Bullet from './Bullet';
import PlayerModel from '../../shared/models/PlayerModel';
import Aura from './Aura';

export default class Player extends PlayerModel {
  public keys: Set<string> = new Set();
  public aura: Aura;

  isAlive() {
    return this.alive;
  }

  die() {
    this.alive = false;
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
      this.hp = this.hp - bullet.power;
      if (this.hp <= 0) {
        if (bullet.owner) {
          bullet.owner.addScore(100);
        }
        this.die();
      }
    }
  }

  goLeft() {
    this.x = this.x - this.speed;
    if (this.aura) {
      this.aura.x = this.x;
    }
  }

  goRight() {
    this.x = this.x + this.speed;
    if (this.aura) {
      this.aura.x = this.x;
    }
  }

  goDown() {
    this.y = this.y + this.speed;
    if (this.aura) {
      this.aura.y = this.y;
    }
  }

  goUp() {
    this.y = this.y - this.speed;
    if (this.aura) {
      this.aura.y = this.y;
    }
  }
}
